from flask import Flask, redirect, render_template, url_for

app = Flask(__name__)


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html',
                           title='Home',
                           is_algorithm=False)


@app.route('/sorting/bubble-sort')
def bubble_sort():
    return render_template('sorting/bubble_sort.html',
                           title='Bubble sort',
                           description='''
                           Bubble sort makes multiple passes through a list,
                           compares elements one by one,
                           and swaps adjacent items that are out of order.
                           With every new pass,
                           the largest element in the list “bubbles up” toward its correct position.
                           ''',
                           is_algorithm=True,
                           img='img/bubble_sort.png',
                           min_value=50,
                           max_value=450)


@app.route('/sorting/insertion-sort')
def insertion_sort():
    return render_template('sorting/insertion_sort.html',
                           title='Insertion sort',
                           description='''
                           An excellent analogy to explain insertion sort is the way you would sort a deck of cards.
                           You’d start by comparing a single card step by step with the rest of the cards until you find its correct position.
                           At that point, you’d insert the card in the correct location and start over with a new card,
                           repeating until all the cards in your hand were sorted.
                           ''',
                           is_algorithm=True,
                           img='img/insertion_sort.png',
                           min_value=50,
                           max_value=450)


@app.route('/sorting/merge-sort')
def merge_sort():
    return render_template('sorting/merge_sort.html',
                           title='Merge sort',
                           description='''
                           In the case of merge sort,
                           the divide-and-conquer approach divides the set of input values into two equal-sized parts,
                           sorts each half recursively, and finally merges these two sorted parts into a single sorted list.
                           ''',
                           is_algorithm=True,
                           img='img/merge_sort.png',
                           min_value=50,
                           max_value=450)


@app.route('/sorting/quick-sort')
def quick_sort():
    return render_template('sorting/quick_sort.html',
                           title='Quick sort',
                           description='''
                           The quicksort algorithm applies the divide-and-conquer principle to divide the input array into two lists,
                           the first with small items and the second with large items.
                           The algorithm then sorts both lists recursively until the resultant list is completely sorted.
                           ''',
                           is_algorithm=True,
                           img='img/quick_sort.png',
                           min_value=5,
                           max_value=450)


@app.route('/pathfinding/dijkstra')
def dijkstra():
    return render_template('pathfinding/dijkstra.html',
                           title="Dijkstra",
                           description='''
                           All nodes begin with a distance attribute of <i>Infinity</i>,
                           We set the start node's distance to 0.
                           We then create an unvisited set that holds all unvisited nodes,
                           and a visited set that holds all visisted nodes.
                           While the unexplored set is not empty,
                           we check each node's neighbor,
                           and update the distance with 1 accordingly.
                           Each visited node is removed from the unexplored set.
                           The {{title}} pathfinding algorithm is done when
                           the target node is removed from the unexplored set.
                           ''')


@app.route('/pathfinding/a_star')
def a_star():
    return render_template('pathfinding/a_star.html',
                           title="A*",
                           description='''
                           Architecto et quia adipisci voluptatem.
                           Eos voluptatum omnis placeat modi dignissimos ab omnis.
                           Sequi nemo doloribus.''')


if(__name__ == '__main__'):
    app.run(debug=True)
