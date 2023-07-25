# create three users (for Players)
sf org create user -s alias=UNO1 firstname=UNO1 lastname=UNO1 username=tom+uno1@ycdtosf.com email=tom+uno1@ycdtosf.com profilename='Standard Platform User' generatepassword=true
sf org create user -s alias=UNO2 firstname=UNO2 lastname=UNO2 username=tom+uno2@ycdtosf.com email=tom+uno2@ycdtosf.com profilename='Standard Platform User' generatepassword=true
sf org create user -s alias=UNO3 firstname=UNO3 lastname=UNO3 username=tom+uno3@ycdtosf.com email=tom+uno3@ycdtosf.com profilename='Standard Platform User' generatepassword=true

# insert Uno Card Metadata via CSV
sf cmdt generate records --csv scripts/cli/cards.csv --type-name UnoCard__mdt