import dimSumMenu from "../../data/menu";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const dimSumId = dimSumMenu.map((dish, i) => {
    return {
      id: i,
      ...dish,
    };
  });

  res.status(200).json(dimSumId);
}
