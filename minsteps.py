from collections import deque

def is_valid(word, target):
    return sorted(word) == sorted(target)

def min_steps_to_target(start, target):
    if not is_valid(start, target):
        return -1

    queue = deque([(start, [start])])
    visited = set([start])

    while queue:
        word, steps = queue.popleft()
        current_path = steps[-1]

        if word == target:
            return steps

        for i in range(len(word)):
            for direction in ['f', 'b']:
                new_word = move_letter(word, i, direction)
                if new_word not in visited:
                    visited.add(new_word)
                    new_path = steps + [new_word]
                    queue.append((new_word, new_path))

    return -1

def move_letter(word, position, direction):
    if direction == 'f':
        return word[position] + word[:position] + word[position+1:]
    elif direction == 'b':
        return word[:position] + word[position+1:] + word[position]

start_word = "badger"
target_word = "agrbed"
steps = min_steps_to_target(start_word, target_word)
if steps != -1:
    print("Steps to rearrange {} to {}: {}".format(start_word, target_word, steps))
else:
    print("No valid steps to rearrange {} to {}".format(start_word, target_word))
