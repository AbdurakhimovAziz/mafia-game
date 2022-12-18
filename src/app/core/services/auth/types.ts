export type LoginRequest =
  // | {
  //     email: string;
  //     username: never;
  //     password: string;
  //   }
  // |
  {
    // email: never;
    username: string;
    password: string;
  };

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};
