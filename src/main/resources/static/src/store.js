export const store = new Vuex.Store({
    state: { 
        messages: [],
        auctions: []
    },
    mutations:{
        setMessages(state, messages){
            state.messages = messages
        },
        prependMessage(state, message){
            state.messages.unshift(message)
        },
        setAuctions(state, auctions){
            state.auctions = auctions
        },
        prependAuctions(state, auctions){
            state.auctions.unshift(auctions)
        }
    },
    actions:{
        async fetchAllMessages(store){
            let messages = await fetch('/rest/messages')
            messages = await messages.json()
            store.commit('setMessages', messages)
        },
        async fetchAllAuctionItems(store){
            let auctions = await fetch('/rest/auctions')
            auctions = await auctions.json()
            console.log(auctions);
            store.commit('setAuctions', auctions)
        }
    }
})