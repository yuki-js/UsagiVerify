//! A simple program that takes a number `n` as input, and writes the `n-1`th and `n`th fibonacci
//! number as an output.

// These two lines are necessary for the program to properly compile.
//
// Under the hood, we wrap your main function with some extra code so that it behaves properly
// inside the zkVM.
#![no_main]

use fibonacci_lib::{verify, Sprm};
sp1_zkvm::entrypoint!(main);

pub fn main() {
    let master_secret = sp1_zkvm::io::read::<Vec<u8>>(); // master secret, private input
    let req_payload = sp1_zkvm::io::read::<Vec<u8>>(); // request payload(access token), private input
    let req_payload_mac = sp1_zkvm::io::read::<Vec<u8>>(); // MAC of the request payload, private input

    let res_payload_sprm = sp1_zkvm::io::read::<Sprm>(); // response payload as SPRM
    let res_payload_mac = sp1_zkvm::io::read::<Vec<u8>>(); // MAC of the response payload, private input

    sp1_zkvm::io::commit(&verify(
        &master_secret,
        &req_payload,
        &req_payload_mac,
        &res_payload_sprm,
        &res_payload_mac,
    ));
}
