mod crypto;

#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct IoHashState {
    pub h: [u32; 8],
    pub message_len: u64,
    pub block_len: usize,
    pub current_block: Vec<u8>,
}



#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct Sprm {
    pub hs: IoHashState,
    pub remaining: Vec<u8>,
}

pub fn verify(
    master_secret: &[u8],
    req_payload: &[u8],
    req_payload_mac: &[u8],
    res_payload_sprm: &Sprm,
    res_payload_mac: &[u8],
) -> bool {
    let req_mac_key = crypto::derive_request_mac_key(master_secret);
    let req_mac = crypto::calculate_mac(&req_mac_key, req_payload);
    if req_mac != req_payload_mac {
        return false;
    }
    let full_hash = crypto::construct_full_hash(res_payload_sprm);
    let res_mac_key = crypto::derive_response_mac_key(master_secret);
    let res_mac = crypto::calculate_mac_hash(&res_mac_key, &full_hash);
    if res_mac != res_payload_mac {
        return false;
    }

    true
}
