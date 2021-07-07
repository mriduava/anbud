export const store = new Vuex.Store({
    state: { 
        messages: [],
        auctions: [],
        oneitem: []
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
        },
        setOneItem(state, oneitem){
            state.oneitem = oneitem
        },
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
            store.commit('setAuctions', auctions)
        },
        async fetchOneAuctionItem(store, id){
            let oneitem = await fetch('/rest/auctions/' + id)
            oneitem = await oneitem.json()
            console.log(oneitem);
            store.commit('setOneItem', oneitem)
        }
    }
})