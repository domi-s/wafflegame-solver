# 🧇 Daily Waffle Game solver

This tool helps solve the [daily Waffle Game puzzle](https://wafflegame.net/) by suggesting moves to transform the current grid into the target grid. It requires knowing both the initial state and the solution.

It is built in C++ and only uses the standard library.

## How it works

I came up with the solution while trying to solve the puzzle manually. I noticed that the game is deterministic, and knowing/guessing the solution means you can intuitively figure out the moves to get there, with five to spare (and so receive a perfect 5-star solution).

The key idea is that every letter out of the `21` is part of a cycle, and by shifting each letter with its right-neighbour in the cycle (last letter with the first), you can reach the solution. Some letters are already in place. My solution skips them completely, but they could be trivially handled by the algorithm as a cycle of length `1`.

In a given cycle of `n` nodes, the algorithm will perform `n - 1` moves to match its target. So if we have `m` cycles, the algorithm will perform `n - m` moves optimally (the sum of all `n` across the `m` cycles is `21`, the size of the board). So then the idea is to not only find the cycles, but to find cycles that are as small as possible, thus maximising `m` and thus minimising the number of moves. Ideally, we're looking for `n - m == 10`, and we take as a precondition that `n - m >= 10` (otherwise you could get 6 or more stars, which isn't going to happen).

The algorithm works as follows, to achieve this solution: it takes each letter that isn't in place and, with the available letters, it creates a cycle using a breadth-first search approach. This way, when it finds a letter that matches the previous one but is also matched by the first one, it knows it has found a cycle, and the shortest possible involving the start letter. It then moves on to the next incorrect letter, and so on, until all letters are accounted for. It then generates a set of `solutionSteps` that are then displayed using the `displayPuzzle` function, highlighting the moves to be made with ANSI colour codes.

## Strengths

**Time complexity.** The time complexity of this algorithm is $O(n^2)$, where $n$ is the number of letters in the puzzle. This is because the algorithm has to check each letter against each other letter to find the cycles, and because letters do repeat, there isn't a way to optimise this further. However, the algorithm is very fast, and can solve the puzzle in a fraction of a second, given that $n := 21$ for the default puzzle.

**Variable board shape and size.** Although the algorithm is designed for a $5 \times 5$ board with elements placed at $(i, j)\ .\ (i \cdot j) \equiv 1\  (\text{MOD } 2)$, it can be easily adapted to any board size. This is because the algorithm doesn't rely on the board shape, but rather on the letters themselves. The only thing that would need to be changed is the `displayPuzzle` function, which would need to be adapted to the new board shape and size. So for instance the weekly deluxe waffle (with a larger $7 \times 7$ grid) can also be solved with this algorithm.

**Ease of use.** The algorithm is very easy to use, and only requires the compilation of the `main.cpp` file. The user can then input the current state of the board and the target state, and the algorithm will output the moves to be made. The algorithm is also very easy to understand, and the code is clear and well-commented.

## Limitations

**Requires knowing the solution.** Although this implementation is very fast and efficient, it does require knowing the solution to the puzzle. This is because the algorithm is designed to find the shortest possible cycles that can be made to reach the solution, and so it needs to know what the solution is. This is a limitation of the algorithm, and it would be interesting to see if a solution could be found that doesn't require knowing the solution beforehand.

> Note: When I have time, I want to add functionality that can detect the correct solution from the given puzzle. I believe this could be done by filtering out possible puzzle solutions from the dictionary based on the input, and then selecting the one that has the smallest number of moves. This would be a fun project to work on in the future.

## Usage

Compile the `main.cpp` file with your favourite C++ compiler.

Run the executable and follow the instructions.

Input your current waffle grid and the target solution to receive move suggestions.

## Credits

This code was written Dominic Satnoianu, initially in 2023 and then updated in 2025. It is released under the MIT license.

## Contribute

Feel free to adapt this code to your needs, and to contribute to it. If you have any suggestions or improvements, please let me know!