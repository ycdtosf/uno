# Next Show

- Reverse
- Shuffle
- UI for Turns
- Notifications?

# 2023-08-01

- Draw Pile
- Discarded?
- remove draw card at start of turn

# Refactor???

- Card Object: Card Custom Metadata???? DONE
- Card Object: merge Action + Value fields??? DONE
- Game Object: Top Card lookup vs Top Card Color / Value / Action ???
- Turn Object: we need "Next" status back... 

# Backlog

> Game Object - Umbrella for Players, Cards, Rules, etc...
    > Top Card (GameCard)
    > Top Card Color
    > Current Player (Player)
    > Player Sequence Direction
    > Deck Count (1 default)
        > auto-scale decks based on need (# of players)
> GameCard Object - all the cards for a Game of Uno
    > Sequence - random number - only the system needs to know...
        > sequence matters in draw pile. does not matter in hand pile. 
    > Is Discarded? - indicates if up or down in pile... Sequence doesn't matter anymore if dicarded.
> Card Object - 108 Records
    > Value - Number
    > Color
    > Action - Skip, Draw Two, Draw Four, Wild, Reverse
> Player Object - Participant in a Game (User)
    > Sequence - random number
> Pile Object
> Turn Object

# Actions

> Start a Game
    > Override "New" function on Game object
        > kicks off a Flow
    > Choose Players - random sequence - set current player
        > as many as you want
        > build GameCard records and shuffle
    > deal cards to players (7 each) = PlayerGameCards
    > set first undealt card to Top Card
> Player Draws Card(s)
    > Optional, e
    > Must Draw = Draw Two or Four, and then turn ends. Automagic?
    > Smart stuff like indicate player must draw
> Player Places Card
    > we can tell the player what cards are valid to play (rules)
> Game Moves to Next Player
    > reverse is weird
    > draw two and four are skipped

# Player Turn Lifecycle

> Did previous player play Draw X?
    > If yes, player draws X cards.
    > If yes, player does not discard.
    > If yes, player turn ends.
> Does Player have valid card in hand?
    > If yes, player can discard.
    > If yes, player can draw.
        Does Player have valid card in hand?
            If yes, player can discard.
    > If no, player must draw.
        Does Player have valid card in hand?
            If yes, player can discard.
> Did player discard Reverse?
    > If yes, change Game direction.
    > If no, leave Direction the same.
> Did player discard Skip?
    > If yes, change Current Player +/-2
    > If no, change Current Player +/-1
> Did player discard Draw 2?
    > If yes, cards drawn in next player turn
> Did player discard Draw 4?
    > If yes, current player selects color
    > If yes, cards drawn in next player turn
> Did player discard Wild?
    > If yes, current player selects color

# Invocables

> RandomNumberInvocable - return some number 

# Rules

> As much logic as possible in Flow
> As much UI as possible in Flow - reference LWCs in Flow if possible
> If we need Apex, let's do Invocables

# Housekeeping

> Stamp Card.Score to GameCard.Score for Pile Roll-Up
