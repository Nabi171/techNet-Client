import { ChangeEvent, FormEvent, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import { usePostCommentMutation } from '../redux/api/apiSlice';
import { useGetCommentQuery} from '../redux/api/apiSlice';
import { useParams } from 'react-router-dom';

// const dummyComments = [
//   'Bhalo na',
//   'Ki shob ghori egula??',
//   'Eta kono product holo ??',
//   '200 taka dibo, hobe ??',
// ];

interface IProps {
  id: string;
}

// console.log('this is id',id)
export default function ProductReview() {

  // console.log('this is id',id)
  const [inputValue, setInputValue] = useState<string>('');
  // console.log(inputValue);

  const { id } = useParams()
  console.log('this is id for comment',id)
  const { data } = useGetCommentQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  const [postComment, { isLoading, isError, isSuccess }] =
    usePostCommentMutation();
    
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
   
    event.preventDefault();
    const options = {
      id: id,
      data: { comment: inputValue },
    };
    
console.log(data?.comments)

    postComment(options)
    setInputValue('');
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
        <Textarea
          className="min-h-[30px]"
          onChange={handleChange}
          value={inputValue}
        />
        <Button
          type="submit"
          className="rounded-full h-10 w-10 p-2 text-[25px]"
        >
          <FiSend />
        </Button>
      </form>
      <div className="mt-10">
        {data?.comments?.map((comment:string, index:number) => (
          <div key={index} className="flex gap-3 items-center mb-5">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}