import axios from 'axios';

const state = {
    todos: []
};

const getters = {
    allTodos: state => state.todos
};

const actions = {
    async fetchTodos({ commit }) {
        const uri = 'https://jsonplaceholder.typicode.com/todos';
        const response = await axios.get(uri);
        commit('setTodos', response.data)
    },
    async addTodo({ commit }, title){
        const uri = 'https://jsonplaceholder.typicode.com/todos';
        const response = await axios.post(uri, { title, completed: false });

        commit('newTodo', response.data);
    },
    async deleteTodo({ commit }, id){
        const uri = `https://jsonplaceholder.typicode.com/todos/${id}`;
        await axios.delete(uri);

        commit('removeTodo', id);
    },
    async filterTodos({ commit }, e){
        //get selected number from event
        const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);
        
        const uri = `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`;
        const response = await axios.get(uri);
        commit('setTodos', response.data);
    },
};

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) => (state.todos = state.todos.filter(todo => todo.id !== id))
};

export default {
    state,
    getters,
    actions,
    mutations
};