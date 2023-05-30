import pandas as pd


# Read the CSV file
df = pd.read_csv('data_clean.csv')
df["65plus_percentage"].dropna()

Q1 = df["65plus_percentage"].quantile(.25)
Q3 = df["65plus_percentage"].quantile(.75)
IQR = Q3 - Q1

outliers = df["65plus_percentage"][((df["65plus_percentage"] < (
    Q1-1.5*IQR)) | (df["65plus_percentage"] > (Q3+1.5*IQR)))]


print(outliers.values.tolist())
