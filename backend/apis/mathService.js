const fibMemo = {};

export async function getFibonacci({ n }) {
    if (n < 0) return { error: "Negative input not allowed" };

    if (n in fibMemo) return fibMemo[n];
    if (n === 0) return 0;
    if (n === 1) return 1;

    const result = await getFibonacci({ n: n - 1 }) + await getFibonacci({ n: n - 2 });
    fibMemo[n] = result;
    return result;
}

export async function multiplyMatrices({ A, B }) {
    if (!Array.isArray(A) || !Array.isArray(B)) {
        return { error: "Inputs must be 2D arrays" };
    }

    const rowsA = A.length, colsA = A[0].length;
    const rowsB = B.length, colsB = B[0].length;

    if (colsA !== rowsB) {
        return { error: "Matrix dimensions do not align for multiplication" };
    }

    const result = Array.from({ length: rowsA }, () => Array(colsB).fill(0));

    for (let i = 0; i < rowsA; i++) {
        for (let j = 0; j < colsB; j++) {
            for (let k = 0; k < colsA; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
        }
    }

    return result;
}