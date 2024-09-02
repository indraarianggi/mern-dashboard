import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";

import { IProductStat } from "@/types";

interface IProductItemProps {
  _id: string;
  category: string;
  name: string;
  price: number;
  rating: number;
  description: string;
  supply: number;
  stat: IProductStat;
}

export const ProductItem = ({
  _id,
  category,
  name,
  price,
  rating,
  description,
  supply,
  stat,
}: IProductItemProps) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14, color: theme.palette.secondary[700] }}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem", color: theme.palette.secondary[400] }}>
          {price.toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          // variant="contained"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
