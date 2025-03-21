//! An end-to-end example of using the SP1 SDK to generate a proof of a program that can be executed
//! or have a core proof generated.
//!
//! You can run this script using the following command:
//! ```shell
//! RUST_LOG=info cargo run --release -- --execute
//! ```
//! or
//! ```shell
//! RUST_LOG=info cargo run --release -- --prove
//! ```

use clap::Parser;
use streamsha::{hash_state::HashState, traits::{Resumable, StreamHasher}, Sha256};
use usagiverify_lib::IoHashState;
use sp1_sdk::{include_elf, ProverClient, SP1Stdin};

/// The ELF (executable and linkable format) file for the Succinct RISC-V zkVM.
pub const USAGIVERIFY_ELF: &[u8] = include_elf!("usagiverify-program");

/// The arguments for the command.
#[derive(Parser, Debug)]
#[clap(author, version, about, long_about = None)]
struct Args {
    #[clap(long)]
    execute: bool,

    #[clap(long)]
    prove: bool,

    #[clap(long, default_value = "20")]
    n: u32,
}

fn main() {
    // Setup the logger.
    sp1_sdk::utils::setup_logger();
    dotenv::dotenv().ok();

    // Parse the command line arguments.
    let args = Args::parse();

    if args.execute == args.prove {
        eprintln!("Error: You must specify either --execute or --prove");
        std::process::exit(1);
    }

    // Setup the prover client.
    let client = ProverClient::from_env();

    // Setup the inputs.
    let mut stdin = SP1Stdin::new();

    let message = b"Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    let (hiding, public) = &message.split_at(55);

    let mut h = Sha256::new();
    h.update(hiding);
    let hash_state = h.pause();
    let ex_hash_state = match hash_state {
        HashState::Sha256(hash_state) => hash_state,
        _ => panic!("Invalid hash state"),
    };

    let mut full_hash = Sha256::new();
    full_hash.update(message);
    let digest = full_hash.finish();

    let iohs = IoHashState {
        h: ex_hash_state.h,
        message_len: ex_hash_state.message_len,
        block_len: ex_hash_state.block_len,
        current_block: ex_hash_state.current_block.to_vec(),
    };
    stdin.write(&iohs);
    stdin.write(public);
    stdin.write(&digest.to_vec());

    if args.execute {
        // Execute the program
        let (output, report) = client.execute(USAGIVERIFY_ELF, &stdin).run().unwrap();
        println!("Program executed successfully. Result: {:?}", output);

        // Record the number of cycles executed.
        println!("Number of cycles: {}", report.total_instruction_count());
    } else {
        // Setup the program for proving.
        let (pk, vk) = client.setup(USAGIVERIFY_ELF);

        // Generate the proof
        let proof = client
            .prove(&pk, &stdin)
            .run()
            .expect("failed to generate proof");

        println!("Successfully generated proof!");

        // Verify the proof.
        client.verify(&proof, &vk).expect("failed to verify proof");
        println!("Successfully verified proof!");
    }
}
