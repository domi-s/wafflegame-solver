#include <iostream>
#include <sstream>
#include <vector>
#include <queue>
#include <set>

using namespace std;

#define input ssin
#define BLUE "\033[34m"
#define RESET "\033[0m"

const int PUZZLE_SIZE = 21; // Each puzzle has 21 unique positions.

string puzzle;
string solution;
set<int> notInPlace;
vector<pair<int, int> > crtSteps, solutionSteps;

struct state { // The state of a chain at any given time, remembering if a letter was used or not in `freq`
    unsigned int freq = 0;
    vector<int> chain;
    int latest;

    void setFrequency(int pos) {
        freq = (freq & (1 << pos));
    }

    void unsetFrequency(int pos) {
        if(!isSet(pos)) return;
        freq = (freq ^ (1 << pos));
    }

    bool isSet(int pos) {
        return freq & (1 << pos);
    }
};

stringstream ssin("PULATNLTLZDAIAOUAIOTL PLANTLUOAUDITZIAATOLL"); // 1st of Feb 2025 Game

void intro() {
    cout << BLUE << "Waffle game solver in C++" << RESET << "\n";
    cout << "Made by Dominic Satnoianu - v2.0 (1st of Feb 2025)\n\n";
    cout << "<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>\n";
    cout << "                                                            \n";
    cout << "<>  Curious about how this works?  Check out the README!  <>\n";
    cout << "                                                            \n";
    cout << "<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>\n\n";
}

void read() {
    cout << "Enter the puzzle, top to bottom, left to right, no spaces:\n\t";
    input >> puzzle;
    cout << "\n";
    cout << "Enter the solution, with the same format:\n\t";
    input >> solution;
    cout << "\n";
}

void displayPuzzle(string puzzle, int pos1 = -1, int pos2 = -1) {
    // Optional arguments to emphasize what needs to be swapped.
    for(int i = 0, pos = 0; i < 5; i++) {
        for(int j = 0; j < 5; j++) {
            const bool isEmpty = i * j % 2; // Pattern for the board, similar to how (i + j) % 2 generates a chess board
            if(isEmpty) cout << " ";
            else {
                if(pos == pos1 || pos == pos2)
                    cout << BLUE;
                cout << puzzle[pos];
            }

            cout << RESET << " ";

            pos += !isEmpty;
        }
        cout << "\n";
    }
}

inline bool areChainEndsConnected(const vector<int> &chain) { // Checks if the final and the first piece of the chain are connected, creating a cycle.
    const int pos1 = 0, pos2 = chain.size() - 1;
    return solution[pos1] == puzzle[pos2];
}

vector<int> solve_bfs(int startPos) { // BFS to find a chain that contains the `startPos`th letter
    queue<state> q;

    state startState;
    startState.setFrequency(startPos);
    startState.chain.push_back(startPos);
    startState.latest = startPos;

    q.push(startState);

    while(!q.empty()) {
        state crt = q.front();
        q.pop();

         for(const auto &i : notInPlace) {
             if(solution[crt.latest] == puzzle[i]) {
                 if(i == startPos) return crt.chain;
                 if(crt.isSet(i)) continue;

                 const int latest = crt.latest;
                 crt.setFrequency(i);
                 crt.chain.push_back(i);
                 crt.latest = i;

                 q.push(crt);

                 crt.latest = latest;
                 crt.chain.pop_back();
                 crt.unsetFrequency(i);
             }
        }
    }
}

void solve_worker() { // Worker that generates chains with the remaining not-in-place letters.
    while(!notInPlace.empty()) {
        vector<int> chain = solve_bfs(*notInPlace.begin());

        int prv = -1;
        for(int i : chain) {
            notInPlace.erase(i);

            if(prv != -1)
                solutionSteps.push_back({prv, i});
            prv = i;
        }
    }
}

void solve() { // Main solving function that find the not-in-place letters, find the cycles and displays/simulates the changes to be made to solve the puzzle.
    for(int i = 0; i < PUZZLE_SIZE; i++)
        if(puzzle[i] != solution[i])
            notInPlace.insert(i);

    solve_worker();

    cout << "\n";
    if(solutionSteps.size() == 10) cout << "Perfect solution found in ";
    cout << BLUE << solutionSteps.size() << " MOVES" << RESET << ":\n";

    for(int i = 0; i < solutionSteps.size(); i++) {
        cout << "\n";
        swap(puzzle[solutionSteps[i].first], puzzle[solutionSteps[i].second]);
        displayPuzzle(puzzle, solutionSteps[i].first, solutionSteps[i].second);
    }
}

int main() {
    intro();
    read();
    displayPuzzle(puzzle);
    solve();
    return 0;
}
