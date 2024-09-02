import { Box, Typography, useTheme } from "@mui/material";

interface IHeaderProps {
  title: string;
  subtitle: string;
}

export const Header = ({ title, subtitle }: IHeaderProps) => {
  const theme = useTheme();

  return (
    <Box>
      <Typography
        variant="h2"
        // color={theme.palette.secondary[100]}
        fontWeight="bold"
        sx={{ color: theme.palette.secondary[100], mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        sx={{ color: theme.palette.secondary[300], mb: "5px" }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};
