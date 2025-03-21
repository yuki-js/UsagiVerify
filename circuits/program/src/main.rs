//! A simple program that takes a number `n` as input, and writes the `n-1`th and `n`th fibonacci
//! number as an output.

// These two lines are necessary for the program to properly compile.
//
// Under the hood, we wrap your main function with some extra code so that it behaves properly
// inside the zkVM.
#![no_main]

use streamsha::{ hash_state::{HashState, Sha256HashState}, traits::{Resumable, StreamHasher}, Sha256};
use usagiverify_lib::IoHashState;
sp1_zkvm::entrypoint!(main);


pub fn main() {
    let hash_state = sp1_zkvm::io::read::<IoHashState>();
    let remaining = sp1_zkvm::io::read::<Vec<u8>>();
    let target_hash = sp1_zkvm::io::read::<Vec<u8>>();

    let mut h = Sha256::resume(HashState::Sha256(Sha256HashState {
        h: hash_state.h,
        message_len: hash_state.message_len,
        block_len: hash_state.block_len,
        current_block: {
            let mut array = [0u8; 64];
            let bytes = &hash_state.current_block[..array.len()];
            array.copy_from_slice(bytes);
            array
        },
    })).unwrap();
    h.update(&remaining);
    let digest = h.finish();

    let verified = if &digest[..] == target_hash {
        true
    } else {
        false
    };
    sp1_zkvm::io::commit(&verified);
}
