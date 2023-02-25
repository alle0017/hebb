class Perceptron{
    dendrite: number;
    bias: number;
    perceptron: number[];
    constructor(input: number, bias: number){
        this.bias = bias;
        this.dendrite = input+1;
        this.perceptron = [bias];
        for(let i = 0; i < input; i++)
            this.perceptron[i+1] = randint(-2.5,2.5);
    }
    //training the perceptron by feeding it 
    //and then calculate the variation with expected output
    trainPercep(input: number[], output: number, classify: (x: number) => number){
        input.unshift(1);
        let res = classify(Algebric.vetDotVet(input,this.perceptron,this.dendrite));
        this.deviationCalc(input,res,output,dConst);
    }
    //calculate the variation with expected output
    deviationCalc(input: number[], output: number, expOut : number, dFunc: (x: number)=>number, lambda: number = 1){
        let res2 = this.getOutput(input,(x: number)=>{return x;});
        for (let j = 0; j < this.dendrite; j++)
            this.perceptron[j] += (expOut - output)*input[j]*dFunc(res2)*lambda;
    }
    //use the perceptron after training
    getOutput(input: number[], classify: (x:number)=>number){
        input.unshift(1);
        return classify(Algebric.vetDotVet(input, this.perceptron, this.dendrite));
    }
}
class Layer{
    dendrite: number;//input
    axon: number; //output
    perceptrons: Perceptron[]; 
    constructor(input: number, output: number){
        this.axon = output;
        this.dendrite = input;
        this.perceptrons = [];
        for(let i = 0; i < output; i++)
            this.perceptrons[i] = new Perceptron(input, randint(0.1,1));
    }
    //feed the layer
    feed(input: number[]){
        let output : number[];
        for(let l = 0; l < this.axon; l++)
            output[l] = this.perceptrons[l].getOutput(input,tanh);
        return output;
    }
    //update the layer with new values of weight
    update(input: number[], output: number[], expOut: number[], lambda: number){
        for(let m = 0; m < this.axon; m++)
            this.perceptrons[m].deviationCalc(input,output[m],expOut[m],dtanh,lambda);
    }
}
class Network{
    lambda: number; //const of learning
    layers: Layer[];
    nOfLayer: number;
    constructor(nOfLayers:number, layers: {input: number, output: number}[], lambda: number){
        this.nOfLayer = nOfLayers;
        this.layers = [];
        this.lambda = lambda;
        for(let i = 0; i < nOfLayers; i++)
            this.layers[i] = new Layer(layers[i].input, layers[i].output);
    }
    backPropagation(input: number[], output: number[], expOut: number[]){}
}