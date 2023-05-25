import pandas as pd

# Read the CSV file
df = pd.read_csv('inkomen.csv', delimiter=";", decimal=",")


print(df)
