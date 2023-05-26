import pandas as pd
import numpy as np 


# Read the CSV file
df = pd.read_csv('data.csv', delimiter=";", decimal=",")

column_mapping = {
    'Buurten': 'neighbourhood',
    'Gemiddeld persoonlijk inkomen per inkomensontvanger (x1000 euro)|2020': 'personal_income',
    'Inwoners|2020': 'residents',
    'Voelt zich niet zo gelukkig of ongelukkig %|2020': 'unhappy_percentage',
    'Door langdurige ziekte sterk belemmerd thuis %|2020': 'prolonged_illness_percentage',
    'Hoog opleidingsniveau %|2020': 'high_level_of_education_percentage',
    'Maakt u zich zorgen om geld %|2020': 'worries_about_money_percentage',
    'Heeft schulden %|2020': 'has_debts_percentage',
    '65 jaar en ouder %|2020': '65plus_percentage'
}
df.rename(columns=column_mapping, inplace=True)

# Print the updated column names
print(df)




