'use client';
import { AuthContext } from '@/context/AuthContextContainer';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const Feedback = () => {
  const { user } = useContext<any>(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: any) {
    data.user = user.name;

    try {
      setLoading(true);
      const req = await fetch(
        'http://localhost:3000/api/v1/note-nestle/subjects/feedbacks',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (req.ok) {
        toast.success('Feedback submitted..', {
          className: 'toast toast-success',
        });
        reset();
      }
    } catch {
      toast.error('Something went wrong, Refresh the page!', {
        className: 'toast toast-fail',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-center items-center"
    >
      <div className="grid w-full lg:w-1/2 gap-[1.5rem] text-start">
        <div>
          <Label htmlFor="message-2" className="text-[1.2rem]">
            Title
          </Label>
          <Input
            type="text"
            placeholder="Enter Title"
            className="text-[1.2rem] text-w bg-title"
            {...register('title')}
            required
          />
        </div>
        <div>
          <Label htmlFor="message-2" className="text-[1.2rem]">
            Your Message
          </Label>
          <Textarea
            placeholder="Type your message here"
            className="text-[1.2rem] bg-title"
            {...register('description')}
            required
          />
        </div>
        <Button
          type="submit"
          variant="secondary"
          className=" text-[1.2rem]"
          disabled={loading}
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ''}
          {loading ? 'Please wait' : 'Submit'}
        </Button>
      </div>
    </form>
  );
};

export default Feedback;
