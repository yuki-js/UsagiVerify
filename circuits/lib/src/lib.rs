#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct IoHashState {
    pub h: [u32; 8],
    pub message_len: u64,
    pub block_len: usize,
    pub current_block: Vec<u8>,
}

/// Compute the n'th fibonacci number (wrapping around on overflows), using normal Rust code.
pub fn fibonacci(n: u32) -> (u32, u32) {
    let mut a = 0u32;
    let mut b = 1u32;
    for _ in 0..n {
        let c = a.wrapping_add(b);
        a = b;
        b = c;
    }
    (a, b)
}
