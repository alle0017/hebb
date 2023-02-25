class Algebric{ //anal for my wife
    private constructor(){}
    static tanh(x: number){
        let exp = (Math.E)**(2*x);
        return (exp+1)/(exp-1);
    }
    static dTanh(x: number){
        return 1-this.tanh(x)**2;
    }
    static vetDotVet(vet1: number[], vet2: number[], dim: number) {
        let res: number = 0;
        for (let i = 0; i < dim; i++) {
            res += vet1[i] * vet2[i];
        }
        return res;
    }
    static tive(x: number) {
        if (x <= 0)
            return 0;
        return 1;
    }
}
function tanh(x: number){ //function for callback, method not allowed
    return Algebric.tanh(x);
}
function dtanh(x: number){
    return Algebric.dTanh(x);
}
function dConst(x: number){return 1;}