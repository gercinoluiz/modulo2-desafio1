import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

// Never Forget to create a DTO
interface TransactionDTO {
  type: 'income' | 'outcome';
  value: number;
  title: string
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }


  // Study more acumulator
  public getBalance(): Balance {

    const { income, outcome } = this.transactions.reduce((acumulator: Balance, transactions: Transaction) => {  // The object of reduce is what format I want Awesome!


      switch (transactions.type) {
        case "income":
          acumulator.income += transactions.value;
          break

        case "outcome":
          acumulator.outcome += transactions.value

        default:
          break;

      }

      return acumulator

    }, {
      income: 0,
      outcome: 0,
      total: 0

    })

    const total = income - outcome;

    return {income, outcome, total}
  }

  public create({ title, value, type }: TransactionDTO): Transaction {

    // I have to create a instance of the model, so that I can return it

    const transaction = new Transaction({ title, value, type })

    this.transactions.push(transaction)

    return transaction

  }
}

export default TransactionsRepository;
