enum TypographyType {
    H1 = "h1",
    H2 = "h2",
    H3 = "h3",
    H4 = "h4",
    P = "p",
}

const styles: Record<TypographyType, string> = {
  [TypographyType.H1]: "text-4xl font-bold mb-4",
  [TypographyType.H2]: "text-3xl font-semibold mb-3",
  [TypographyType.H3]: "text-2xl font-medium mb-2",
  [TypographyType.H4]: "text-xl font-medium mb-1",
  [TypographyType.P]: "text-base mb-2",
};

function Typography({ children, type }: { children: React.ReactNode, type: TypographyType }) {
    const Component = type;

    return (
        <Component className={styles[type]}>
            {children}
        </Component>
    )
}

export { Typography, TypographyType };