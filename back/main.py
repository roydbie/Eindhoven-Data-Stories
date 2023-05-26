import pandas as pd
import numpy as np

# Read the CSV file
df = pd.read_csv('data_clean.csv')

print(df)

#Calculate Q1, Q3, and IQR
Q1 = df.quantile(0.25)
Q3 = df.quantile(0.75)

print(Q1)
print(Q3)

IQR = Q3 - Q1

#print(IQR)

#set threshold at 1.5
threshold = 1.5

#determine outliers
outliers = (df < Q1 - threshold * IQR) | (df > Q3 + threshold * IQR)







