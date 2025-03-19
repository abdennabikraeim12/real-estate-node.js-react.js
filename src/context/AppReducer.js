

export const getBasketTotal = (basket) =>
  basket.reduce((amount, item) => {
    return amount + item.price;
  }, 0);



export const initialState = {
    basket:[],
    user:null
}
const AppReducer = (state=initialState,action)=>{
    
        switch(action.type){
            case "SET_USER":
                return {
                    ...state,// bech n7afthou 3la 9ima ba9ya fi state eli hya basket
                    user:action.user,
                };
            case "ADD_TO_BASKET":
                    return {
                        ...state,// bech n7afthou 3la 9ima ba9ya fi state eli hya user
                        basket:[...state.basket, action.item]
                    };
                    case "EMPTY_BASKET":
                    return {
                        ...state,// bech n7afthou 3la 9ima ba9ya fi state eli hya user
                        basket:[],
                    };

            case "REMOVE_FROM_BASKET":
                        const index= state.basket.findIndex(
                            (basketItem) => basketItem.id === action.id);

                            let newBasket = [...state.basket]
                            if(index >= 0){
                                newBasket.splice(index, 1);// fil splice hethi tjib index mta3 element wa nsuprimyo meno (1) one elemnent
                            }else{
                                console.warn(
                                    `can't remove product {id ${action.id} as it's not in basket}`
                                );
                            }
                        return {
                            ...state,
                            basket:newBasket,
                        };

                default:
                    return state;
         
        }
}

export default AppReducer;