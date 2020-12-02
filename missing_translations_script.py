# !/usr/bin/env python
# coding: utf-8

import json
import os
import pprint
import operator

from functools import reduce

pp = pprint.PrettyPrinter(indent=2)

with open(f'{os.getcwd()}/src/assets/translations/en_uk/common.json') as json_file:
    uk_data = json.load(json_file)
with open(f'{os.getcwd()}/src/assets/translations/es/common.json') as json_file:
    es_data = json.load(json_file)
with open(f'{os.getcwd()}/src/assets/translations/fr/common.json') as json_file:
    fr_data = json.load(json_file)
with open(f'{os.getcwd()}/src/assets/translations/jp/common.json') as json_file:
    jp_data = json.load(json_file)

def get_from_dict(data_dict, map_list):
    try:
        return reduce(operator.getitem, map_list, data_dict)
    except KeyError:
        return None

def compare_all_translations(key_list):
    missing_list = []
    if not get_from_dict(uk_data, key_list): missing_list.append('uk')
    if not get_from_dict(es_data, key_list) or get_from_dict(es_data, key_list) == "": missing_list.append('es')
    if not get_from_dict(fr_data, key_list) or get_from_dict(fr_data, key_list) == "": missing_list.append('fr')
    if not get_from_dict(jp_data, key_list) or get_from_dict(jp_data, key_list) == "": missing_list.append('jp')
    return missing_list

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
                missing_dict[missing_translation].append(f'{".".join(key_list)} -> {get_from_dict(uk_data, key_list)}')
            list_number[depth] += 1
            key_list.pop()
        else:
            key_list.append(deeper_key)
            depth += 1
            list_number.append(0)
    if list_number[0] == len(list(uk_data.keys())):
        complete = True

pp.pprint(missing_dict)
