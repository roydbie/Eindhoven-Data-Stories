import pandas as pd

data_file = 'data_clean.csv'
# Read the CSV file
df = pd.read_csv(data_file)

def find_outliers(df):
   
    Q1 = df.quantile(0.25)
    Q3 = df.quantile(0.75)
    IQR = Q3 - Q1

    # Set threshold at 1.5
    threshold = 1.5

    # Determine outliers
    outliers = (df < Q1 - threshold * IQR) | (df > Q3 + threshold * IQR)

    # Filter so that only outliers are shown
    outliers_df = df[outliers]

    # Create an empty list to store the outlier information
    outlier_info = []

    # Iterate over each column in the DataFrame
    for col in df.columns:
        # Filter rows where the value is not NaN and is an outlier
        col_outliers = outliers[col].dropna()
        col_outliers = col_outliers[col_outliers]  # Exclude rows with false values

        # Iterate over each outlier in the column
        for row, value in col_outliers.items():
            # Get the neighbourhood value from the corresponding row in the original dataset
            neighbourhood_value = df.loc[row, 'neighbourhood']

            # Append outlier information to the outlier_info list
            outlier_info.append({'Outlier_Row': row, 'Outlier_Column': col, 'Value': df.loc[row, col], 'neighbourhood': neighbourhood_value})

    # Create the outliers_table DataFrame from the outlier_info list
    outliers_table = pd.DataFrame(outlier_info)

    return outliers_table



outliers_table = find_outliers(df)
print(outliers_table)

#imput
variable_x="personal_income"
variable_y="unhappy_percentage"

correlation_matrix = df[[variable_x, variable_y]].corr()
correlation_coef = correlation_matrix.loc[variable_x, variable_y]

correlation_coef_rounded = "{:.2f}".format(correlation_coef)

print(correlation_coef_rounded)

