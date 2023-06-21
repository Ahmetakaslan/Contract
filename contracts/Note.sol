// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Note {
    struct Not {
        uint256 id;
        string baslik;
        string icerik;
    }

    mapping(uint256 => Not) public notlar;
    uint256 public notSayisi;

    event NotEklendi(uint256 notId, string baslik, string icerik);
    event NotGuncellendi(uint256 notId, string baslik, string icerik);
    event NotSilindi(uint256 notId);

    function notEkle(string memory _baslik, string memory _icerik) public {
        notSayisi++;
        notlar[notSayisi] = Not(notSayisi, _baslik, _icerik);
        emit NotEklendi(notSayisi, _baslik, _icerik);
    }

    function notGuncelle(uint256 _notId, string memory _baslik, string memory _icerik) public {
        require(_notId <= notSayisi, "Gecersiz not IDsi.");
        notlar[_notId].baslik = _baslik;
        notlar[_notId].icerik = _icerik;
        emit NotGuncellendi(_notId, _baslik, _icerik);
        
    }

    function notSil(uint256 _notId) public {
        require(_notId <= notSayisi, "Gecersiz not IDsi.");
        delete notlar[_notId];
        emit NotSilindi(_notId);
    }

    function notGetir(uint256 _notId) public view returns (string memory, string memory) {
        require(_notId <= notSayisi, "Gecersiz not IDsi.");
        return (notlar[_notId].baslik, notlar[_notId].icerik);
    }
}