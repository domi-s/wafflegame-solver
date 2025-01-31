# Daily Waffle Game solver

## Description
A quick and dirty solver for the daily Waffle Game puzzle. This tool helps find a five-star solution by analyzing the input grid and target grid, then suggesting moves to transform one into the other.

## How it Works
1. Takes the current puzzle state and known solution as inputs
2. Uses Depth-First Search (DFS) with a stack to identify connected letter chains
3. Generates step-by-step instructions for rearranging letters to reach the solution

## Limitations
- Not production-ready code
- Basic implementation focused on functionality
- Requires knowing both initial state and solution

## Usage
Input your current waffle grid and the target solution to receive move suggestions.
