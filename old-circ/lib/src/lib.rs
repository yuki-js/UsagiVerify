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

/*
{
  "master_secret": "666f6f626172",
  "req_payload": "65794a7a645749694f694a6d623238694c434a72615751694f694a6859324e6c63334e66644739725a5734694c434a7063334d694f694a745957357762327476496e303d",
  "req_payload_mac": "0a5f3bbd1050f14fed857dce085a43ebdbae4544cc08868627f11cfd49f766b1",
  "res_payload": "73756200000000000000000000000000666f6f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000076616c3230323200000000000000000035303030300000000000000000000000000000000000000000000000000000000000000000000000000000000000000076616c3230323300000000000000000031303030303000000000000000000000000000000000000000000000000000000000000000000000000000000000000076616c32303234000000000000000000323030303030000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "res_payload_mac": "0bdf682acd89b5ae8837592f091257cd8a2cb8d3ac1c12108c064e699f2ff5c4"
}
   */
