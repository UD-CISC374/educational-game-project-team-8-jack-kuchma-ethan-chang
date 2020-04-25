---
waltz:
  title: Educational Game Design Document Template
meta:
  version: 0.0.2
  gdd authors:
    - Ethan Chang
    - Jack Kuchma
  template authors:
    - Austin Cory Bart <acbart@udel.edu>
    - Mark Sheriff
    - Alec Markarian
    - Benjamin Stanley
---

# Overview

*Notes written in italics must be deleted in the final version.*

# NaCl/NaOH The base is under a salt

## Elevator Pitch

This is a turn-based card game. The player plays against a bot and attempts to defeat the enemy by attacking it with chemistry cards they place down on the board. These cards are either an acid or base. The cards contain stats of molarity and moles. Molarity is the damage done to the player if it attack a player directly. Moles is the card's health as well as the damage done to other cards. Take the enemy's health to 0 before they do to yours.

## Influences (Brief)

- Hearthstone:
  - Medium: Video Game
  - Explanation: Hearthstone is a turn-based card game in which the player fights another with cards and spells, each with varying hitpoints and damage. This game is similar to this as it will be a turn-based card game. But rather than health, cards will have moles for health.
- Legends of Runeterra:
  - Medium: Video Game
  - Explanation: Legends of Runeterra is a turn-based card game in which the player fights another with cards and spells. This game has a similar feel to it as it is also a turn-based card game with the goal of defeating the enemy.
- Honors General Chemistry 111:
  - Medium: UD classroom lecture
  - Explanation: In Ethan's honors general chemistry class, one topic that was reviewed was limiting reactants and acid-base reactions. Combining these two, this game involves those topics and attempts to appeal to students learning chemistry.

## Core Gameplay Mechanics (Brief)

- Each player starts with 3 cards in their hand and draws one from their deck every turn, including the first turn. The player who goes second (i.e. the enemy bot), will start with 4 cards rather than 3 to balance our the fairness.
- Play acid or base cards from your hand by clicking and dragging them onto the board, which has seven card spaces for each player. When the card is placed down, it cannot attack until the player's next turn.
- Click and drag a card from your side of the board to a card on the other side of the board to attack/neutralize it.
- Acids can only attack bases and vice versa. Acids cannot attack acids and bases cannot attack bases.
- During an attack between two cards, each card takes damage based on the moles neutralized in the reaction aka the other card's moles. Health points are recalculated and updated for each card. If it's health (moles) is less than or equal to 0, it's destroyed.
- Attacking the other player directly with an acid or base card on the board deals damage based on the card's molarity.
- When a player's health reaches 0, they lose.

# Learning Aspects

## Learning Domains

Introductory Chemistry

## Target Audiences

Novice chemists with a little prior knowledge in chemistry
Appropriate for middle school and high school kids and perhaps adults who are young at heart

## Target Contexts

This would be assigned as supplementary practice in a course teaching introductory chemistry, specifically during the unit on acid/base chemistry, which often comes after limiting reactants.

## Learning Objectives

- Identify limiting reactants: By the end of the lesson, students will be able to identify the limiting and excess reactant in an acid-base reaction.
- Calculate limiting reactants: By the end of the lesson, students will be able to calculate the moles of an acid or base used in a chemical reaction and determine how many moles are left in excess.
- Calculate moles from molarity: By the end of the lesson, students will be able to calculate the moles of an acid or base given it's molarity and volume.

## Prerequisite Knowledge

- Prior to the game, players need to be able to define molarity and identify its units.
- Prior to the game, players need to be able to explain the reaction between a strong acid and strong base.

## Assessment Measures

A short pre-test and matching post-test will be designed to assess student learning

- Given the number of moles of an acid and base, determine the limiting reactant and how much excess reactant is left over.
- Given the number of moles of an acid and base, determine the number of moles of a salt and water are formed.

# What sets this project apart?

- Most introductory activities regarding acid-base reactions and limiting reactants involve worksheets or labwork, this is a (hopefully) fun card game.
- The gameplay of adding an acid/base to the water trap card follows lab safety in that you should always mix those two in that order and not the other way around.
- The gameplay of molarity doing damage to player resembles the fact that higher concentrations of acids and bases generally have stronger potency.

# Player Interaction Patterns and Modes

## Player Interaction Pattern

This is a game for one person. They draw cards, play them, and use them to attack the enemy and their cards.

## Player Modes

- Single-player: You repeatedly draw, play, and attack cards until the enemy is defeated.

# Gameplay Objectives

- Neutralize enemy cards:
    - Description: When your moles of acid/base is greater than the enemy's base/acid that you attack, their card is neutralized, leaving less enemies on the board and a greater chance at winning.
    - Alignment: Learning to predict the outcome of reactions and know which reactant is left over in excess aligns with the learning objectives of predicting and calculating limiting reactants.
- Attack the enemy:
    - Description: Beat the enemy by attacking it with cards. When its health reaches 0, you win.
    - Alignment: You have to go through all the learning objectives of being able to calculate and predict the outcomes of reactions to clear their board and beat the enemy.

# Procedures/Actions

You can drag cards from your hand to the battlefield -- these cards can't attack until your next turn. You can drag cards on the battlefield from your side to a card on the other side to attack it. You can also drag cards on the battlefield from your side to the enemy directly to attack them.

# Rules

- Action Points: The player starts out with one action point when the game starts and gains another at the start of turn (i.e. Turn 1 = 1 action point. Turn 2 = 2 action points. Etc.). This can be used to spend on playing cards and putting them on the board.
- Cards: The player can play the cards from their hand (provided they have enough action points) and draw one at the start of their turn.

# Objects/Entities

- Cards which the player plays and attacks with
- Board which is going to house the cards when they are played

## Core Gameplay Mechanics (Detailed)

- Turns: A player has a turn to play the cards they want from their hand, trade into other cards, and attack the opponent. Each turn the player draws a card.
- Action points: Cards cost a certain amount of action points to play. Each turn the player's action points refreshes and gains +1 action point.

## Feedback

- If the player tries to do an incorrect move (i.e. Acids can only attack bases and vice versa. Acids cannot attack acids and bases cannot attack bases.) then they are given a tool tip that the move cannot happen.
- When attacking a card with a card, only one card will be left over. Visually, the player is notified of the reaction's excess and limiting reactants (i.e. the card left standing is the one in excess).

- The longer-term feedback the player will recieve is a stat board in which it could tell things like moles neutralized in reactions, enemy cards destroyed, user's cards destroyed, etc.

# Story and Gameplay

## Presentation of Rules

- When the player first opens the game, they could go through a tutorial to get them used to the mechanics and how all the cards interact with each other

## Presentation of Content

- The tutorial will be multiple, small tutorials, in which it introduces each chemistry concept (acids, bases, etc.), then puts them all together in the regular gamemode.
- As the game proceeds, the player will have to consistently implement the concepts of the core material to make the most advantageous moves that will help win the game.

## Story (Brief)

- There is no real canonical story due to it being a casual card game, but will feature notable and memorable characters to help fill in and flesh out the world.

## Storyboarding

![Concept_Image](Concept_Image.jpg)


# Assets 

## Aethestics

The aesthetics should be serious and adventurous. The game should have an engrossing feel. This should encourage the player to think about strategy and predict outcomes of different moves.

## Graphical

- Characters List
  - The player's castles: Needs to have at least three levels of ruin (healthy, partially destroyed, destroyed)
  - Cards: Needs to have the name and picture of the acid or base. Also needs to display the card's stats (molarity and moles)
- Textures:
  - N/A
- Environment Art/Textures:
  - Background: The background should be a dirt field between two castles
  

## Audio

- Music List (Ambient sound)
  - General gameplay: Laboratory sounds, Light, adventurous music.

- Sound List (SFX)
  - Placing a card on the board: Light smash sound, Light pop sound
  - Attacking another card: Clink of bottles, Bubbling sound
  - Using a water spell card: Splash of water
  - Using any other spell card: Sounds of mystical magic being casted
  - A card attacking a player: Corrosive sounds, Fizzing sound
  - Clicking end turn: Click sound
  - Drawing a card: Sound of flipping a page
  - Win: Fanfare
  - Lose: Explosion


# Metadata

* Template created by Austin Cory Bart <acbart@udel.edu>, Mark Sheriff, Alec Markarian, and Benjamin Stanley.
* Version 0.0.3
