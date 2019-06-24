import React from "react";
import Typography from "@material-ui/core/Typography";
import { SPIN_COST } from "../../config";

export default function ReviewOrder(props) {
  const { spinsToBuy } = props;

  return (
    <React.Fragment>
      <Typography variant="h6">Confirm your order</Typography>
      <Typography variant="body1">Quantity: {spinsToBuy} Spins</Typography>
      <Typography variant="body1">
        Cost: ${(spinsToBuy * SPIN_COST).toFixed(2)}
      </Typography>
    </React.Fragment>
  );
}
