use rsa::{pkcs1v15::{Signature, VerifyingKey}, BigUint, RsaPublicKey};
use sha2::Sha256;
use rsa::signature::Verifier;

#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct IoHashState {
    pub h: [u32; 8],
    pub message_len: u64,
    pub block_len: usize,
    pub current_block: Vec<u8>,
}

pub fn verify_doc(
    hash: &[u8],
    signature: &[u8],
) -> bool {
    let doc_verify_pubkey = RsaPublicKey::new_unchecked(
        BigUint::new(vec![
            0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
            0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F,
        ]),
        BigUint::new(vec![
            0x01, 0x00, 0x01,
        ])
    );
    let s = Signature::try_from(signature).unwrap();
    VerifyingKey::<Sha256>::new(doc_verify_pubkey).verify(&hash, &s).is_ok()
}
