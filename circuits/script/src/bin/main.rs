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
use fibonacci_lib::{IoHashState, Param, Sprm};
use sp1_sdk::{include_elf, ProverClient, SP1Stdin};
use streamsha::{
    hash_state::HashState,
    traits::{Resumable, StreamHasher},
    Sha256,
};

/// The ELF (executable and linkable format) file for the Succinct RISC-V zkVM.
pub const FIBONACCI_ELF: &[u8] = include_elf!("fibonacci-program");

/// The arguments for the command.
#[derive(Parser, Debug)]
#[clap(author, version, about, long_about = None)]
struct Args {
    #[clap(long)]
    execute: bool,

    #[clap(long)]
    prove: bool,

    #[clap(long)]
    param: String,
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

    // decode params
    let param: Param = serde_json::from_str(&args.param).unwrap();

    // Setup the prover client.
    let client = ProverClient::from_env();

    // Setup the inputs.
    let mut stdin = SP1Stdin::new();

    // Read the inputs from the command line arguments as hex strings.
    let master_secret = hex::decode(&param.master_secret).unwrap();
    let req_payload = hex::decode(&param.req_payload).unwrap();
    let req_payload_mac = hex::decode(&param.req_payload_mac).unwrap();
    let res_payload = hex::decode(&param.res_payload).unwrap();
    let res_payload_mac = hex::decode(&param.res_payload_mac).unwrap();

    let mut h = Sha256::new();
    h.update(&res_payload[0..64 * 3]);
    let hs = match h.pause() {
        HashState::Sha256(hs) => hs,
        _ => panic!("Hash type does not match"),
    };

    let res_payload_sprm = Sprm {
        hs: IoHashState {
            h: hs.h,
            message_len: hs.message_len,
            block_len: hs.block_len,
            current_block: hs.current_block.to_vec(),
        },
        remaining: res_payload[64 * 3..].to_vec(),
    };

    // Write the inputs to stdin.
    stdin.write(&master_secret);
    stdin.write(&req_payload);
    stdin.write(&req_payload_mac);
    stdin.write(&res_payload_sprm);
    stdin.write(&res_payload_mac);

    if args.execute {
        // Execute the program
        let (output, report) = client.execute(FIBONACCI_ELF, &stdin).run().unwrap();
        println!("Program executed successfully.");

        // Read the output.
        println!("Result: {:?}", output);

        // Record the number of cycles executed.
        println!("Number of cycles: {}", report.total_instruction_count());
    } else {
        // Setup the program for proving.
        let (pk, vk) = client.setup(FIBONACCI_ELF);

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
