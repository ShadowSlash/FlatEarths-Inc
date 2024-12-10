import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import { trucateText } from "../util/text";

import { formatDistanceToNow } from "date-fns";

const BlogCard = ({ title, text, date, id, onReadMore, onDelete }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const handleDelete = async () => {
    // Close the dialog
    handleOpen();

    // TODO: Implement delete functionality using the DELETE API endpoint

    // Call the delete function
    onDelete(id);

    console.log("Delete post with id:", id);
  };

  return (
    <Card className="mt-6 w-96">
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Delete this Post?</DialogHeader>
        <DialogBody>
          This action will permanently delete this post. Are you sure you want
          to continue?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="red" onClick={handleDelete}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <CardBody>
        <div className="flex justify-between items-center">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {title}
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            size="sm"
            onClick={handleOpen}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 24 24">
              <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z"></path>
            </svg>
          </IconButton>
        </div>
        <Typography className="min-h-12">{trucateText(text, 80)}</Typography>
        <Typography color="blue-gray" variant="small">
          {formatDistanceToNow(date, { addSuffix: true })}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button onClick={() => onReadMore(id)}>Read More</Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
