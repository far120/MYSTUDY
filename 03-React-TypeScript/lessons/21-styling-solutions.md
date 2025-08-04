# Lesson 21: Styling Solutions 🎨

## Welcome to Advanced Styling! ✨

**Styling** in React TypeScript apps can be done in many ways! Each approach has its strengths - from traditional CSS to modern CSS-in-JS solutions. Let's explore different styling strategies and build beautiful, maintainable interfaces!

## 🎯 CSS Modules with TypeScript

```tsx
// Button.module.css
.button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.primary {
  background-color: #3b82f6;
  color: white;
}

.primary:hover:not(:disabled) {
  background-color: #2563eb;
}

.secondary {
  background-color: #6b7280;
  color: white;
}

.secondary:hover:not(:disabled) {
  background-color: #4b5563;
}

.danger {
  background-color: #ef4444;
  color: white;
}

.danger:hover:not(:disabled) {
  background-color: #dc2626;
}

.outline {
  background-color: transparent;
  border: 2px solid currentColor;
}

.small {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.large {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
}

.fullWidth {
  width: 100%;
  justify-content: center;
}

.loading {
  position: relative;
  color: transparent;
}

.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1rem;
  height: 1rem;
  border: 2px solid currentColor;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

// CSS Module type definitions
// Button.module.css.d.ts
export interface ButtonStyles {
  button: string;
  primary: string;
  secondary: string;
  danger: string;
  outline: string;
  small: string;
  large: string;
  fullWidth: string;
  loading: string;
}

declare const styles: ButtonStyles;
export default styles;

// TypeScript component using CSS Modules
import React from 'react';
import styles from './Button.module.css';
import clsx from 'clsx';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  outline?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = 'primary',
  size = 'medium',
  outline = false,
  fullWidth = false,
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  children,
  className
}: ButtonProps) {
  const buttonClass = clsx(
    styles.button,
    styles[variant],
    {
      [styles.outline]: outline,
      [styles.small]: size === 'small',
      [styles.large]: size === 'large',
      [styles.fullWidth]: fullWidth,
      [styles.loading]: loading
    },
    className
  );

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {children}
    </button>
  );
}

// Card component with CSS Modules
// Card.module.css
.card {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: box-shadow 0.2s;
}

.card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.header {
  padding: 1.5rem 1.5rem 0;
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem;
}

.subtitle {
  color: #6b7280;
  margin: 0;
}

.content {
  padding: 1.5rem;
}

.footer {
  padding: 0 1.5rem 1.5rem;
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.compact .header {
  padding: 1rem 1rem 0;
}

.compact .content {
  padding: 1rem;
}

.compact .footer {
  padding: 0 1rem 1rem;
}

// Card.tsx
import React from 'react';
import styles from './Card.module.css';
import clsx from 'clsx';

interface CardProps {
  title?: string;
  subtitle?: string;
  image?: string;
  compact?: boolean;
  className?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export function Card({
  title,
  subtitle,
  image,
  compact = false,
  className,
  children,
  actions
}: CardProps) {
  return (
    <div className={clsx(styles.card, { [styles.compact]: compact }, className)}>
      {image && (
        <img src={image} alt={title || 'Card image'} className={styles.image} />
      )}

      {(title || subtitle) && (
        <div className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      )}

      <div className={styles.content}>
        {children}
      </div>

      {actions && (
        <div className={styles.footer}>
          {actions}
        </div>
      )}
    </div>
  );
}
```

## 🎯 Styled Components with TypeScript

```tsx
// Install: npm install styled-components @types/styled-components

import styled, {
  css,
  ThemeProvider,
  createGlobalStyle,
} from "styled-components";
import React from "react";

// Theme definition
interface Theme {
  colors: {
    primary: string;
    secondary: string;
    danger: string;
    success: string;
    warning: string;
    gray: {
      50: string;
      100: string;
      200: string;
      500: string;
      700: string;
      900: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export const theme: Theme = {
  colors: {
    primary: "#3b82f6",
    secondary: "#6b7280",
    danger: "#ef4444",
    success: "#10b981",
    warning: "#f59e0b",
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      500: "#6b7280",
      700: "#374151",
      900: "#111827",
    },
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
};

// Global styles
const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background-color: ${(props) => props.theme.colors.gray[50]};
    color: ${(props) => props.theme.colors.gray[900]};
  }

  button {
    font-family: inherit;
  }
`;

// Styled Button with TypeScript
interface StyledButtonProps {
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  outline?: boolean;
  fullWidth?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.sm};
  font-weight: 500;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary}40;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Size variants */
  ${(props) => {
    switch (props.size) {
      case "small":
        return css`
          padding: ${props.theme.spacing.xs} ${props.theme.spacing.sm};
          font-size: 0.875rem;
        `;
      case "large":
        return css`
          padding: ${props.theme.spacing.md} ${props.theme.spacing.xl};
          font-size: 1.125rem;
        `;
      default:
        return css`
          padding: ${props.theme.spacing.sm} ${props.theme.spacing.md};
          font-size: 1rem;
        `;
    }
  }}

  /* Color variants */
  ${(props) => {
    const color = props.theme.colors[props.variant || "primary"];

    if (props.outline) {
      return css`
        background-color: transparent;
        color: ${color};
        border: 2px solid ${color};

        &:hover:not(:disabled) {
          background-color: ${color};
          color: white;
        }
      `;
    }

    return css`
      background-color: ${color};
      color: white;

      &:hover:not(:disabled) {
        filter: brightness(0.9);
      }
    `;
  }}

  /* Full width */
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: 0.875rem;
    padding: ${(props) => props.theme.spacing.xs} ${(props) =>
        props.theme.spacing.sm};
  }
`;

// Styled Card
const StyledCard = styled.div<{ compact?: boolean }>`
  background: white;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  box-shadow: ${(props) => props.theme.shadows.sm};
  overflow: hidden;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: ${(props) => props.theme.shadows.md};
  }
`;

const CardHeader = styled.div<{ compact?: boolean }>`
  padding: ${(props) =>
    props.compact ? props.theme.spacing.md : props.theme.spacing.lg};
  padding-bottom: 0;
`;

const CardTitle = styled.h3`
  margin: 0 0 ${(props) => props.theme.spacing.sm};
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.gray[900]};
`;

const CardSubtitle = styled.p`
  margin: 0;
  color: ${(props) => props.theme.colors.gray[500]};
`;

const CardContent = styled.div<{ compact?: boolean }>`
  padding: ${(props) =>
    props.compact ? props.theme.spacing.md : props.theme.spacing.lg};
`;

const CardFooter = styled.div<{ compact?: boolean }>`
  padding: 0 ${(props) =>
      props.compact ? props.theme.spacing.md : props.theme.spacing.lg} ${(
      props
    ) => (props.compact ? props.theme.spacing.md : props.theme.spacing.lg)};
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
  justify-content: flex-end;
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

// Component usage
interface ButtonProps extends StyledButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button(props: ButtonProps) {
  return <StyledButton {...props} />;
}

interface CardProps {
  title?: string;
  subtitle?: string;
  image?: string;
  compact?: boolean;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export function Card({
  title,
  subtitle,
  image,
  compact,
  children,
  actions,
}: CardProps) {
  return (
    <StyledCard compact={compact}>
      {image && <CardImage src={image} alt={title || "Card image"} />}

      {(title || subtitle) && (
        <CardHeader compact={compact}>
          {title && <CardTitle>{title}</CardTitle>}
          {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
        </CardHeader>
      )}

      <CardContent compact={compact}>{children}</CardContent>

      {actions && <CardFooter compact={compact}>{actions}</CardFooter>}
    </StyledCard>
  );
}

// Responsive Grid with styled-components
const Grid = styled.div<{
  columns?: number;
  gap?: keyof Theme["spacing"];
  responsive?: boolean;
}>`
  display: grid;
  gap: ${(props) => props.theme.spacing[props.gap || "md"]};

  ${(props) => {
    const cols = props.columns || 1;

    if (props.responsive) {
      return css`
        grid-template-columns: 1fr;

        @media (min-width: ${props.theme.breakpoints.sm}) {
          grid-template-columns: repeat(${Math.min(cols, 2)}, 1fr);
        }

        @media (min-width: ${props.theme.breakpoints.md}) {
          grid-template-columns: repeat(${Math.min(cols, 3)}, 1fr);
        }

        @media (min-width: ${props.theme.breakpoints.lg}) {
          grid-template-columns: repeat(${cols}, 1fr);
        }
      `;
    }

    return css`
      grid-template-columns: repeat(${cols}, 1fr);
    `;
  }}
`;

// Loading spinner component
const SpinnerContainer = styled.div<{ size?: "small" | "medium" | "large" }>`
  display: inline-block;
  ${(props) => {
    switch (props.size) {
      case "small":
        return css`
          width: 1rem;
          height: 1rem;
        `;
      case "large":
        return css`
          width: 2rem;
          height: 2rem;
        `;
      default:
        return css`
          width: 1.5rem;
          height: 1.5rem;
        `;
    }
  }}
`;

const SpinnerElement = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid ${(props) => props.theme.colors.gray[200]};
  border-top-color: ${(props) => props.theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export function Spinner({
  size = "medium",
}: {
  size?: "small" | "medium" | "large";
}) {
  return (
    <SpinnerContainer size={size}>
      <SpinnerElement />
    </SpinnerContainer>
  );
}

// App wrapper with theme
export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div style={{ padding: "2rem" }}>
        <Grid columns={3} gap="lg" responsive>
          <Card
            title="Card Title"
            subtitle="Card subtitle"
            actions={
              <>
                <Button variant="secondary" outline>
                  Cancel
                </Button>
                <Button variant="primary">Confirm</Button>
              </>
            }
          >
            <p>Card content goes here...</p>
          </Card>

          <Card title="Loading Example">
            <Spinner /> Loading data...
          </Card>

          <Card title="Button Examples">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Button size="small">Small Button</Button>
              <Button size="medium">Medium Button</Button>
              <Button size="large">Large Button</Button>
              <Button variant="danger" fullWidth>
                Full Width Danger
              </Button>
            </div>
          </Card>
        </Grid>
      </div>
    </ThemeProvider>
  );
}
```

## 🎯 Design System with TypeScript

```tsx
// Design system foundation
export interface DesignTokens {
  colors: {
    brand: {
      primary: string;
      secondary: string;
      accent: string;
    };
    semantic: {
      success: string;
      warning: string;
      error: string;
      info: string;
    };
    neutral: {
      white: string;
      gray: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      black: string;
    };
  };
  typography: {
    fontFamily: {
      sans: string;
      serif: string;
      mono: string;
    };
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      "2xl": string;
      "3xl": string;
      "4xl": string;
    };
    fontWeight: {
      light: number;
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
    lineHeight: {
      tight: number;
      normal: number;
      relaxed: number;
    };
  };
  spacing: {
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    8: string;
    10: string;
    12: string;
    16: string;
    20: string;
    24: string;
    32: string;
  };
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  transitions: {
    fast: string;
    normal: string;
    slow: string;
  };
}

export const designTokens: DesignTokens = {
  colors: {
    brand: {
      primary: "#3b82f6",
      secondary: "#8b5cf6",
      accent: "#f59e0b",
    },
    semantic: {
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    },
    neutral: {
      white: "#ffffff",
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
      },
      black: "#000000",
    },
  },
  typography: {
    fontFamily: {
      sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
      mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    0: "0",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    32: "8rem",
  },
  borderRadius: {
    none: "0",
    sm: "0.125rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  transitions: {
    fast: "all 0.15s ease",
    normal: "all 0.2s ease",
    slow: "all 0.3s ease",
  },
};

// Typography components
interface TextProps {
  as?: keyof JSX.IntrinsicElements;
  size?: keyof DesignTokens["typography"]["fontSize"];
  weight?: keyof DesignTokens["typography"]["fontWeight"];
  color?: string;
  align?: "left" | "center" | "right";
  className?: string;
  children: React.ReactNode;
}

export function Text({
  as: Component = "p",
  size = "base",
  weight = "normal",
  color = designTokens.colors.neutral.gray[900],
  align = "left",
  className,
  children,
  ...props
}: TextProps) {
  const style: React.CSSProperties = {
    fontSize: designTokens.typography.fontSize[size],
    fontWeight: designTokens.typography.fontWeight[weight],
    color,
    textAlign: align,
    margin: 0,
    fontFamily: designTokens.typography.fontFamily.sans,
  };

  return (
    <Component style={style} className={className} {...props}>
      {children}
    </Component>
  );
}

// Heading component
interface HeadingProps extends Omit<TextProps, "size"> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Heading({ level, weight = "bold", ...props }: HeadingProps) {
  const sizeMap = {
    1: "4xl" as const,
    2: "3xl" as const,
    3: "2xl" as const,
    4: "xl" as const,
    5: "lg" as const,
    6: "base" as const,
  };

  return (
    <Text
      as={`h${level}` as keyof JSX.IntrinsicElements}
      size={sizeMap[level]}
      weight={weight}
      {...props}
    />
  );
}

// Box component for layout
interface BoxProps {
  as?: keyof JSX.IntrinsicElements;
  padding?: keyof DesignTokens["spacing"];
  margin?: keyof DesignTokens["spacing"];
  bg?: string;
  borderRadius?: keyof DesignTokens["borderRadius"];
  shadow?: keyof DesignTokens["shadows"];
  className?: string;
  children: React.ReactNode;
}

export function Box({
  as: Component = "div",
  padding,
  margin,
  bg,
  borderRadius,
  shadow,
  className,
  children,
  ...props
}: BoxProps) {
  const style: React.CSSProperties = {
    ...(padding && { padding: designTokens.spacing[padding] }),
    ...(margin && { margin: designTokens.spacing[margin] }),
    ...(bg && { backgroundColor: bg }),
    ...(borderRadius && {
      borderRadius: designTokens.borderRadius[borderRadius],
    }),
    ...(shadow && { boxShadow: designTokens.shadows[shadow] }),
  };

  return (
    <Component style={style} className={className} {...props}>
      {children}
    </Component>
  );
}

// Flex component
interface FlexProps extends BoxProps {
  direction?: "row" | "column";
  align?: "flex-start" | "center" | "flex-end" | "stretch";
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around";
  gap?: keyof DesignTokens["spacing"];
  wrap?: boolean;
}

export function Flex({
  direction = "row",
  align = "stretch",
  justify = "flex-start",
  gap,
  wrap = false,
  ...props
}: FlexProps) {
  const style: React.CSSProperties = {
    display: "flex",
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap ? "wrap" : "nowrap",
    ...(gap && { gap: designTokens.spacing[gap] }),
  };

  return <Box {...props} style={{ ...style, ...props.style }} />;
}

// Alert component using design system
interface AlertProps {
  variant?: "success" | "warning" | "error" | "info";
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export function Alert({
  variant = "info",
  title,
  children,
  onClose,
}: AlertProps) {
  const variantStyles = {
    success: {
      bg: `${designTokens.colors.semantic.success}15`,
      borderColor: designTokens.colors.semantic.success,
      iconColor: designTokens.colors.semantic.success,
    },
    warning: {
      bg: `${designTokens.colors.semantic.warning}15`,
      borderColor: designTokens.colors.semantic.warning,
      iconColor: designTokens.colors.semantic.warning,
    },
    error: {
      bg: `${designTokens.colors.semantic.error}15`,
      borderColor: designTokens.colors.semantic.error,
      iconColor: designTokens.colors.semantic.error,
    },
    info: {
      bg: `${designTokens.colors.semantic.info}15`,
      borderColor: designTokens.colors.semantic.info,
      iconColor: designTokens.colors.semantic.info,
    },
  };

  const style = variantStyles[variant];

  return (
    <Box
      bg={style.bg}
      padding="4"
      borderRadius="md"
      style={{
        border: `1px solid ${style.borderColor}`,
        position: "relative",
      }}
    >
      <Flex align="flex-start" gap="3">
        <div
          style={{
            width: "1.25rem",
            height: "1.25rem",
            borderRadius: "50%",
            backgroundColor: style.iconColor,
            flexShrink: 0,
            marginTop: "0.125rem",
          }}
        />

        <Box style={{ flex: 1 }}>
          {title && (
            <Text
              weight="semibold"
              size="sm"
              style={{ marginBottom: "0.25rem" }}
            >
              {title}
            </Text>
          )}
          <Text size="sm" color={designTokens.colors.neutral.gray[700]}>
            {children}
          </Text>
        </Box>

        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: designTokens.colors.neutral.gray[500],
              cursor: "pointer",
              padding: "0.25rem",
              borderRadius: designTokens.borderRadius.sm,
            }}
          >
            ×
          </button>
        )}
      </Flex>
    </Box>
  );
}

// Usage example
export function DesignSystemExample() {
  return (
    <Box padding="8">
      <Heading level={1} style={{ marginBottom: "2rem" }}>
        Design System Example
      </Heading>

      <Flex direction="column" gap="6">
        <Alert variant="success" title="Success!">
          Your changes have been saved successfully.
        </Alert>

        <Alert variant="warning" title="Warning">
          Please review your input before submitting.
        </Alert>

        <Alert variant="error" title="Error">
          Something went wrong. Please try again.
        </Alert>

        <Alert variant="info">
          This is some helpful information for you to know.
        </Alert>

        <Box
          bg={designTokens.colors.neutral.white}
          padding="6"
          borderRadius="lg"
          shadow="md"
        >
          <Heading level={2} style={{ marginBottom: "1rem" }}>
            Typography Examples
          </Heading>

          <Flex direction="column" gap="3">
            <Text size="4xl" weight="bold">
              Extra Large Heading
            </Text>
            <Text size="2xl" weight="semibold">
              Large Heading
            </Text>
            <Text size="lg" weight="medium">
              Medium Text
            </Text>
            <Text size="base">Regular body text with normal weight</Text>
            <Text size="sm" color={designTokens.colors.neutral.gray[600]}>
              Small text in muted color
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
```

## 🎯 Advanced Tailwind CSS Patterns

```tsx
// Tailwind with custom variants and components
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb",
          900: "#1e3a8a",
        },
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "bounce-gentle": "bounceGentle 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceGentle: {
          "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-5px)" },
          "60%": { transform: "translateY(-3px)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};

// Advanced component composition with Tailwind
import React from "react";
import { clsx } from "clsx";

// Utility function for conditional classes
export function cn(
  ...classes: (string | undefined | null | boolean)[]
): string {
  return clsx(...classes);
}

// Variant system with Tailwind
interface ButtonVariantProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
}

const buttonVariants = {
  variant: {
    primary: "bg-brand-500 hover:bg-brand-600 text-white shadow-sm",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white shadow-sm",
    outline:
      "border-2 border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-white",
    ghost: "text-brand-500 hover:bg-brand-50",
    link: "text-brand-500 hover:text-brand-600 underline-offset-4 hover:underline",
  },
  size: {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  },
};

function getButtonClasses({
  variant = "primary",
  size = "md",
  loading,
  disabled,
}: ButtonVariantProps) {
  return cn(
    // Base styles
    "inline-flex items-center justify-center gap-2 font-medium rounded-md transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
    // Variant styles
    buttonVariants.variant[variant],
    // Size styles
    buttonVariants.size[size],
    // State styles
    {
      "opacity-50 cursor-not-allowed": disabled || loading,
      "cursor-wait": loading,
    }
  );
}

interface TailwindButtonProps extends ButtonVariantProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function TailwindButton({
  variant,
  size,
  loading,
  disabled,
  type = "button",
  onClick,
  children,
  className,
}: TailwindButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        getButtonClasses({ variant, size, loading, disabled }),
        className
      )}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}

// Complex layout with Tailwind
interface DashboardLayoutProps {
  sidebar: React.ReactNode;
  header: React.ReactNode;
  children: React.ReactNode;
}

export function DashboardLayout({
  sidebar,
  header,
  children,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebar}
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Header */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow-sm border-b border-gray-200">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="flex-1 px-4 flex items-center justify-between">
            {header}
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Card with advanced Tailwind patterns
interface TailwindCardProps {
  title?: string;
  subtitle?: string;
  image?: string;
  badge?: { text: string; variant: "success" | "warning" | "error" | "info" };
  hover?: boolean;
  className?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export function TailwindCard({
  title,
  subtitle,
  image,
  badge,
  hover = false,
  className,
  children,
  actions,
}: TailwindCardProps) {
  const badgeVariants = {
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
  };

  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-md overflow-hidden",
        {
          "hover:shadow-lg hover:-translate-y-1 transition-all duration-300":
            hover,
          "animate-fade-in": true,
        },
        className
      )}
    >
      {image && (
        <div className="relative">
          <img
            src={image}
            alt={title || "Card image"}
            className="w-full h-48 object-cover"
          />
          {badge && (
            <div className="absolute top-4 right-4">
              <span
                className={cn(
                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                  badgeVariants[badge.variant]
                )}
              >
                {badge.text}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        {(title || subtitle) && (
          <div className="mb-4">
            {title && (
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {title}
              </h3>
            )}
            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          </div>
        )}

        <div className="text-gray-700">{children}</div>

        {actions && (
          <div className="mt-6 flex gap-3 justify-end">{actions}</div>
        )}
      </div>
    </div>
  );
}

// Usage example
export function TailwindExample() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center animate-slide-up">
          Advanced Tailwind Components
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TailwindCard
            title="Success Card"
            subtitle="Everything is working perfectly"
            badge={{ text: "Active", variant: "success" }}
            hover
          >
            <p>
              This card demonstrates the success variant with hover effects and
              animations.
            </p>
          </TailwindCard>

          <TailwindCard
            title="Warning Card"
            subtitle="Please pay attention"
            badge={{ text: "Warning", variant: "warning" }}
            hover
            actions={
              <>
                <TailwindButton variant="outline" size="sm">
                  Cancel
                </TailwindButton>
                <TailwindButton variant="primary" size="sm">
                  Confirm
                </TailwindButton>
              </>
            }
          >
            <p>This card shows warning state with action buttons.</p>
          </TailwindCard>

          <TailwindCard
            title="Loading Example"
            subtitle="Processing your request"
            hover
            actions={
              <TailwindButton variant="primary" size="sm" loading>
                Processing
              </TailwindButton>
            }
          >
            <p>This demonstrates loading states and disabled interactions.</p>
          </TailwindCard>
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Button Variants
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <TailwindButton variant="primary">Primary</TailwindButton>
            <TailwindButton variant="secondary">Secondary</TailwindButton>
            <TailwindButton variant="outline">Outline</TailwindButton>
            <TailwindButton variant="ghost">Ghost</TailwindButton>
            <TailwindButton variant="link">Link</TailwindButton>
          </div>

          <div className="mt-6 flex gap-4">
            <TailwindButton size="sm">Small</TailwindButton>
            <TailwindButton size="md">Medium</TailwindButton>
            <TailwindButton size="lg">Large</TailwindButton>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## 🎯 What You've Learned

### ✅ Styling Approaches:

1. **CSS Modules** with TypeScript for scoped styling
2. **Styled Components** with theme systems and responsive design
3. **Design Systems** with consistent tokens and components
4. **Advanced Tailwind** patterns with custom variants
5. **Component composition** strategies

### ✅ Best Practices:

1. **Consistent design tokens** across your application
2. **Responsive design** patterns and breakpoints
3. **Accessible styling** with focus states and semantic colors
4. **Performance optimization** with CSS-in-JS and critical CSS
5. **Maintainable architecture** with reusable style systems

## 🚀 What's Next?

**Congratulations!** You've completed Week 3 - Advanced Patterns! 🎉

In **Week 4: Real-World Applications**, we'll learn:

- **Lesson 22**: React Router and Navigation
- **Lesson 23**: API Integration and Data Fetching
- **Lesson 24**: State Management with Zustand
- **Lesson 25**: Authentication and Authorization
- **Lesson 26**: Performance and Optimization
- **Lesson 27**: Deployment and Production

Your styling game is now professional-level! 🎨

---

**💡 Pro Tip**: Choose one styling approach for your project and stick with it. Consistency is more valuable than using every available tool - whether that's CSS Modules, Styled Components, or Tailwind CSS!
