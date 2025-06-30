import { Card, Typography } from "@mui/material";

interface PromoCardProps {
  title: any;
  gradient: any;
}

const PromoCard = ({ title, gradient }: PromoCardProps) => {
  return (
    <Card
      sx={{
        background: gradient,
        color: "#fff",
        borderRadius: 4,
        p: 1,
        minHeight: 120,

        boxShadow: "0px 10px 8px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Typography fontSize={16} fontWeight="bold">
        {title}
      </Typography>
    </Card>
  );
};

export default PromoCard;
