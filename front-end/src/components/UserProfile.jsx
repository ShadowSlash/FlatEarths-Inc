import {
  Avatar,
  Button,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";

import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

function UserProfile() {

  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <section className="container mx-auto px-8 py-10">
      <Card
        shadow={false}
        className="border border-gray-300 rounded-2xl"
      >
        <CardBody>
          <div className="flex lg:gap-0 gap-6 flex-wrap justify-between items-center">
            <div className="flex items-center gap-3">
              <Avatar src={`https://i.pravatar.cc/50?u=${user.username}`} alt="avatar" variant="rounded" />
              <div>
                <Typography color="blue-gray" variant="h6">
                  {user.username}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-gray-600"
                >
                  {user.email}
                </Typography>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outlined"
                className="border-gray-300 flex items-center gap-2"
              >
                <i className="fa fa-github text-base" />
                Github
              </Button>
              <Button
                variant="outlined"
                className="border-gray-300 flex items-center gap-2"
              >
                <i className="fa-brands fa-twitter" />
                Twitter
              </Button>
              <Button
                variant="outlined"
                className="border-gray-300 flex items-center gap-2"
              >
                <i className="fa-brands fa-medium" />
                Medium
              </Button>
            </div>
          </div>
          <Typography
            variant="small"
            className="font-normal text-gray-600 my-6"
          >
            Passionate UI/UX designer focused on creating intuitive and engaging
            digital experiences. <br /> Driven by design thinking, creativity,
            and a love for problem-solving.
          </Typography>
          <div className="hidden lg:flex lg:items-center lg:gap-6 mt-2">
              <Button
                variant="gradient"
                size="sm"
                className="hidden lg:inline-block"
                onClick={() => navigate('/new')}
              >
                <span>Write a new Post</span>
              </Button>
            </div>
        </CardBody>
      </Card>

    </section>
  );
}

export default UserProfile;