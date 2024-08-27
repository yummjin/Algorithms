def count_repaints(board, start_row, start_col, pattern):
    repaints = 0
    for i in range(8):
        for j in range(8):
            if board[start_row + i][start_col + j] != pattern[i][j]:
                repaints += 1
    return repaints


def get_min_repaints(board, M, N):
    board1 = [
        ['W', 'B', 'W', 'B', 'W', 'B', 'W', 'B'],
        ['B', 'W', 'B', 'W', 'B', 'W', 'B', 'W'],
        ['W', 'B', 'W', 'B', 'W', 'B', 'W', 'B'],
        ['B', 'W', 'B', 'W', 'B', 'W', 'B', 'W'],
        ['W', 'B', 'W', 'B', 'W', 'B', 'W', 'B'],
        ['B', 'W', 'B', 'W', 'B', 'W', 'B', 'W'],
        ['W', 'B', 'W', 'B', 'W', 'B', 'W', 'B'],
        ['B', 'W', 'B', 'W', 'B', 'W', 'B', 'W'],
    ]

    board2 = [
        ['B', 'W', 'B', 'W', 'B', 'W', 'B', 'W'],
        ['W', 'B', 'W', 'B', 'W', 'B', 'W', 'B'],
        ['B', 'W', 'B', 'W', 'B', 'W', 'B', 'W'],
        ['W', 'B', 'W', 'B', 'W', 'B', 'W', 'B'],
        ['B', 'W', 'B', 'W', 'B', 'W', 'B', 'W'],
        ['W', 'B', 'W', 'B', 'W', 'B', 'W', 'B'],
        ['B', 'W', 'B', 'W', 'B', 'W', 'B', 'W'],
        ['W', 'B', 'W', 'B', 'W', 'B', 'W', 'B'],
    ]

    min_repaints = 9999

    for i in range(M - 7):
        for j in range(N - 7):
            repaints1 = count_repaints(board, i, j, board1)
            repaints2 = count_repaints(board, i, j, board2)
            min_repaints = min(min_repaints, repaints1, repaints2)

    return min_repaints


M, N = map(int, input().split())
board = [list(input()) for _ in range(M)]

print(get_min_repaints(board, M, N))