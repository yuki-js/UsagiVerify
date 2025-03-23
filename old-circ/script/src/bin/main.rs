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
use usagiverify_lib::{IoHashState, Sprm};
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

    #[clap(long)]
    master_secret: String,

    #[clap(long)]
    req_payload: String,

    #[clap(long)]
    req_payload_mac: String,

    #[clap(long)]
    res_payload: String,

    #[clap(long)]
    res_payload_mac: String,
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

    // Read the inputs from the command line arguments as hex strings.
    let master_secret = hex::decode(&args.master_secret).unwrap_or("foobar".as_bytes().to_vec());
    let req_payload = hex::decode(&args.req_payload).unwrap_or("eyJzdWIiOiJmb28iLCJraWQiOiJhY2Nlc3NfdG9rZW4iLCJpc3MiOiJtYW5wb2tvIn0=".as_bytes().to_vec());
    let req_payload_mac = hex::decode(&args.req_payload_mac).unwrap_or(hex::decode("0a5f3bbd1050f14fed857dce085a43ebdbae4544cc08868627f11cfd49f766b1").unwrap());
    let res_payload = hex::decode(&args.res_payload).unwrap_or(hex::decode("73756200000000000000000000000000666f6f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000076616c3230323200000000000000000035303030300000000000000000000000000000000000000000000000000000000000000000000000000000000000000076616c3230323300000000000000000031303030303000000000000000000000000000000000000000000000000000000000000000000000000000000000000076616c32303234000000000000000000323030303030000000000000000000000000000000000000000000000000000000000000000000000000000000000000").unwrap());
    let res_payload_mac = hex::decode(&args.res_payload_mac).unwrap_or(hex::decode("0bdf682acd89b5ae8837592f091257cd8a2cb8d3ac1c12108c064e699f2ff5c4").unwrap());

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
