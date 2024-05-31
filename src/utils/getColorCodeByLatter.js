
const colors = {
    A: '#d32f2f',
    B: '#c2185b',
    C: '#7b1fa2',
    D: '#512da8',
    E: '#303f9f',
    F: '#1976d2',
    G: '#0288d1',
    H: '#0097a7',
    I: '#00796b',
    J: '#388e3c',
    K: '#689f38',
    L: '#afb42b',
    M: '#fbc02d',
    N: '#ffa000',
    O: '#f57c00',
    P: '#e64a19',
    Q: '#5d4037',
    R: '#757575',
    S: '#455a64',
    T: '#212121',
    U: '#000000',
    V: '#ffffff',
    W: '#c62828',
    X: '#7b1fa2',
    Y: '#4a148c',
    Z: '#1a237e',
};


export default function getColorCodeByLatter(latter) {
    return [colors[latter] || colors.A];
}