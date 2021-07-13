export const store = new Vuex.Store({
    state: { 
        messages: [],
        auctions: [],
        bids:[]
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
        prependAuction(state, auction){
            state.auctions.unshift(auction)
        },
        setBids(state, bids){
            state.bids = bids
        },
        prependBid(state, bid){
            state.bids.unshift(bid)
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
            store.commit('setAuctions', auctions)
        },
        async fetchAllBids(store){
            let bids = await fetch('/rest/bids')
            bids = await bids.json()
            store.commit('setBids', bids)
        }
    }
})