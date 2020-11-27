#!/usr/bin/env python
# coding: utf-8

# In[4]:


import json


# In[5]:


with open('/Users/kieranmcclymont/Documents/Projects/trip_ninja_quick_trip/src/assets/translations/en_uk/common.json') as json_file:
    uk_data = json.load(json_file)
with open('/Users/kieranmcclymont/Documents/Projects/trip_ninja_quick_trip/src/assets/translations/es/common.json') as json_file:
    es_data = json.load(json_file)
with open('/Users/kieranmcclymont/Documents/Projects/trip_ninja_quick_trip/src/assets/translations/fr/common.json') as json_file:
    fr_data = json.load(json_file)
with open('/Users/kieranmcclymont/Documents/Projects/trip_ninja_quick_trip/src/assets/translations/jp/common.json') as json_file:
    jp_data = json.load(json_file)


# In[6]:


from functools import reduce
import operator

def get_from_dict(dataDict, mapList):
    try:
        return reduce(operator.getitem, mapList, dataDict)
    except KeyError:
        return None


# In[7]:


def compare_all_translations(key_list):
    missing_list = []
    if not get_from_dict(uk_data, key_list): missing_list.append('uk')
    if not get_from_dict(es_data, key_list) or get_from_dict(es_data, key_list) == "": missing_list.append('es')
    if not get_from_dict(fr_data, key_list) or get_from_dict(fr_data, key_list) == "": missing_list.append('fr')
    if not get_from_dict(jp_data, key_list) or get_from_dict(jp_data, key_list) == "": missing_list.append('jp')
    return missing_list


# In[8]:



key_list = []
complete = False
missing_dict = {
    'uk': [],
    'es': [],
    'fr': [],
    'jp': [],
}

list_number = [0]
depth = 0

while not complete:
    if list_number[depth] == len(list(get_from_dict(uk_data, key_list).keys())):
        key_list.pop()
        depth -= 1
        list_number.pop()
        list_number[depth] += 1
    else:
        deeper_key = list(get_from_dict(uk_data, key_list).keys())[list_number[depth]]
        if type(get_from_dict(uk_data, key_list)[deeper_key]) == str:
            key_list.append(deeper_key)
            missing_translations = compare_all_translations(key_list)
            for missing_translation in missing_translations:
                missing_dict[missing_translation].append(f'{key_list}')
            list_number[depth] += 1
            key_list.pop()
        else:
            key_list.append(deeper_key)
            depth += 1
            list_number.append(0)
    if list_number[0] == len(list(uk_data.keys())):
        complete = True

print(missing_dict)

                


# In[ ]:




