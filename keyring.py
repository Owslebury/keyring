def move_letter(lst, position, direction):
    if direction.lower() == 'f':
        lst.insert(0, lst.pop(position))
    elif direction.lower() == 'b':
        lst.append(lst.pop(position))
    else:
        print("Invalid direction. Please enter 'f' for front or 'b' for back.")


def main():
    letters = ['a', 'b', 'c', 'd', 'e']  # Initial list of letters

    print("Initial list of letters:", letters)

    while True:
        print("\nCurrent list:", letters)
        position = int(input("Enter the position of the letter you want to move (1 to {}): ".format(len(letters)))) - 1
        direction = input("Enter 'f' to move to front or 'b' to move to back: ")

        move_letter(letters, position, direction)

        print("Updated list:", letters)

if __name__ == "__main__":
    main()
