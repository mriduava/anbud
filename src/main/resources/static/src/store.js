export const store = new Vuex.Store({
    state: { 
        messages: []
    },
    mutations:{
        setMessages(state, messages){
            state.messages = messages
        },
        prependMessage(state, message){
            state.messages.unshift(message)
        }
    },
    actions:{
        async fetchAllMessages(store){
            let messages = await fetch('/rest/messages')
            messages = await messages.json()
            console.log(messages);
            store.commit('setMessages', messages)
        }
    }
})