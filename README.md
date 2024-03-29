PROJECT DOCUMENTATION
=====================

|               |   |                       |
|---------------|---|-----------------------|
|   Project     | : | Chess                 |
|   Author      | : | Ethan Tan Wee En      |
|   Language    | : | TypeScript (ts)       |
|   Dates       | : | September 2020 (I)    |
|               | : | ... (II)              |
|               | : | ... (III)             |

<br/>

## Phase I - Chess

Description:

    *   Design a Chess Simulator that allows regular chess gameplay
    *   Custom chesspieces can be used
        -   add class to < src/chess_pieces >
        -   add symbol to < src/chess_general/pieceType.ts >

Pre-requisites:

    *   Moderate TypeScript knowledge
    *   Interfaces
    *   Abstract Classes
    *   Understanding of Chess

Comments:

    *   Meant to be precursor to Hexapawn Project
    *   To be finished

## Phase II - Data Structures

Description:

    *   Design and build optimal data structures for AI playing, such as but not limited to, trees and nodes
    *   Optimise code from Phase I
    *   Design Player classes that would eventually offload some properties and methods from ChessGame class
    *   Add a `Save Progress` function that allows players to save their game progress in snapshots
    *   Design and implement efficient searching and sorting algorithms to be used by said custom data structures

Pre-requisites:

    *   Understanding of basic algorithms
    *   Knowledge of trees and graphs

Comments:

    *   To be embarked on after Year 1 / Semester 2

## Phase III - Hexapawn Model

Description:

    *   Build and complete a fully functional Hexapawn Model
    *   The model should be able to illustrate deep learning to a certain extent

Pre-requisites:

    *   Understanding of Hexapawn's rules and conditions
    *   How learning can be explained

Comments:

    *   ...

>   **TO_DO**:
>
>   +   Fix winner statement - DONE
>   +   Add alternative endgame criteria
>   +   Add stalemate possibility
>   +   Add Castling and Pawn Promotion Functionalities
>   +   Fix inherent bugs (//!)
>   +   Incoherency in "to" coordinate selection (re-use code from `getPieceToMove()`)
>   +   Code Optimisation
>   +   Code clean-up
>   +   Widen Colour Scheme - DONE
