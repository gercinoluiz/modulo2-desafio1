import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {

  type: 'income' | 'outcome';
  value: number;
  title: string

}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ type, title, value }: Request): Transaction {

   //   Sanitization

    if (!["income", "outcome"].includes(type)) {
      throw Error("Income must be income or outcome")
    }



    const {total} = this.transactionsRepository.getBalance();

    if( type === "outcome" && total < value){
      throw Error ("You have not onough of found")
    }


    const transaction = this.transactionsRepository.create({title, value, type})


    return transaction
  }
}

export default CreateTransactionService;
