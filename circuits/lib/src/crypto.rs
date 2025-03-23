use streamsha::{hash_state::{HashState, Sha256HashState}, traits::{Resumable, StreamHasher}, Sha256};

use crate::Sprm;

pub fn calculate_sha256(
    input: &[u8],
) -> Vec<u8> {
    let mut hasher = Sha256::new();
    hasher.update(input);
    hasher.finish().to_vec()
}


pub fn calculate_mac(
    derived_key: &[u8],
    payload: &[u8],
) -> Vec<u8> {
    // sha256(key + sha256(payload))
    calculate_sha256(&[derived_key, &calculate_sha256(payload)].concat())
}
pub fn derive_response_mac_key(
    master_secret: &[u8],
) -> Vec<u8> {
    // sha256(masterSecret + "response")
    calculate_sha256(&[master_secret, b"response"].concat())
}
pub fn derive_request_mac_key(
    master_secret: &[u8],
) -> Vec<u8> {
    // sha256(masterSecret + "request")
    calculate_sha256(&[master_secret, b"request"].concat())
}

pub fn construct_full_hash(
  sprm: &Sprm,
) -> Vec<u8> {
  let hash_state = &sprm.hs;
  let remaining = &sprm.remaining;
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
  h.finish().to_vec()
}
