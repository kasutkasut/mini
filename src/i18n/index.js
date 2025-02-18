import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { characterTranslations } from './characters';

// 语言包
const resources = {
  en: {
    characters: characterTranslations.en,
    translation: {
      // 通用
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      confirm: 'Confirm',
      back: 'Back',
      
      // 导航
      nav: {
        aiAvatar: 'AI Avatar',
        chat: 'Chat',
        recharge: 'Recharge',
        profile: 'Profile'
      },

      // 个人资料页
      profile: {
        title: 'Profile',
        basicInfo: 'Basic Information',
        userId: 'User ID',
        username: 'Username',
        editProfile: 'Edit Profile',
        settings: {
          notification: 'Notification Settings',
          language: 'Language Settings',
          privacy: 'Privacy Settings',
          help: 'Help & Feedback',
          logout: 'Log Out'
        },
        memberStatus: {
          premium: 'Premium Member',
          regular: 'Regular Member'
        }
      },

      // 充值页面
      recharge: {
        title: 'Recharge',
        currentStatus: 'Current Status',
        selectPlan: 'Select a Plan',
        plans: {
          basic: {
            name: 'Basic Plan',
            price: '19.9',
            period: 'month',
            features: [
              '100 chats per day',
              'Basic AI model',
              'Standard voice synthesis',
              'Basic character library'
            ]
          },
          pro: {
            name: 'Pro Plan',
            price: '49.9',
            period: 'month',
            features: [
              'Unlimited chats',
              'GPT-4 model',
              'Advanced voice synthesis',
              'Full character library',
              'Custom characters',
              'Priority support'
            ]
          },
          team: {
            name: 'Team Plan',
            price: '299.9',
            period: 'month',
            features: [
              'All Pro features',
              '5 sub-accounts',
              'API access',
              'Dedicated support',
              'Custom model training',
              'Brand customization'
            ]
          }
        },
        popular: 'Most Popular',
        payNow: 'Pay Now',
        selectPlanBtn: 'Select Plan'
      },

      // 搜索
      search: {
        placeholder: 'Search by name, keywords, or tags'
      },

      // 过滤器
      filters: {
        featured: 'Featured',
        popular: 'Popular',
        new: 'New',
        group: 'Group'
      },

      // 标签
      tags: {
        showMore: 'Show More ∨',
        showLess: 'Show Less ∧',
        historical: 'Historical',
        fantasy: 'Fantasy',
        adventure: 'Adventure',
        romance: 'Romance',
        mystery: 'Mystery',
        sciFi: 'Sci-Fi',
        drama: 'Drama',
        comedy: 'Comedy',
        action: 'Action',
        sliceOfLife: 'Slice of Life',
        schoolLife: 'School Life',
        modern: 'Modern',
        urban: 'Urban',
        rural: 'Rural',
        office: 'Office',
        virtual: 'Virtual',
        fashion: 'Fashion',
        music: 'Music',
        influencer: 'Influencer',
        martialArts: 'Martial Arts',
        cultivation: 'Cultivation',
        supernatural: 'Supernatural',
        magic: 'Magic',
        timeTravel: 'Time Travel',
        gaming: 'Gaming',
        sports: 'Sports',
        art: 'Art',
        food: 'Food',
        travel: 'Travel',
        business: 'Business',
        politics: 'Politics',
        military: 'Military',
        medical: 'Medical',
        detective: 'Detective',
        cyberpunk: 'Cyberpunk',
        postApocalyptic: 'Post-apocalyptic',
        steampunk: 'Steampunk',
        mythology: 'Mythology',
        folklore: 'Folklore',
        superpower: 'Superpower',
        ai: 'AI',
        robot: 'Robot',
        space: 'Space',
        kingdom: 'Kingdom',
        empire: 'Empire',
        academy: 'Academy',
        university: 'University',
        family: 'Family',
        friendship: 'Friendship',
        socialMedia: 'Social Media',
        popCulture: 'Pop Culture',
        trendsetter: 'Trendsetter'
      },

      // 角色
      characters: {
        liuYexi: {
          name: 'Liu Yexi',
          description: 'A virtual idol blending modern aesthetics with classical Chinese culture.'
        },
        kingship: {
          name: 'KINGSHIP',
          description: 'A groundbreaking virtual band from the Bored Ape Yacht Club NFT project.'
        },
        aespa: {
          name: 'Aespa',
          description: 'A K-POP girl group combining real members with virtual counterparts.'
        }
      },

      // 通用
      common: {
        by: 'By'
      },

      // 聊天
      chat: {
        remainingFreeChats: '{{count}} Free Chats Remaining',
        resetCounter: 'Reset Counter (Test Only)'
      }
    }
  },
  zh: {
    translation: {
      // 通用
      edit: '编辑',
      save: '保存',
      cancel: '取消',
      delete: '删除',
      confirm: '确认',
      back: '返回',
      
      // 导航
      nav: {
        aiAvatar: 'AI形象',
        chat: '聊天',
        recharge: '充值',
        profile: '我的'
      },

      // 个人资料页
      profile: {
        title: '个人资料',
        basicInfo: '基本信息',
        userId: '用户ID',
        username: '用户名',
        editProfile: '编辑资料',
        settings: {
          notification: '通知设置',
          language: '语言设置',
          privacy: '隐私设置',
          help: '帮助与反馈',
          logout: '退出登录'
        },
        memberStatus: {
          premium: '高级会员',
          regular: '普通会员'
        }
      },

      // 充值页面
      recharge: {
        title: '充值',
        currentStatus: '当前状态',
        selectPlan: '选择套餐',
        plans: {
          basic: {
            name: '基础套餐',
            price: '19.9',
            period: '月',
            features: [
              '每日100次对话',
              '基础AI模型',
              '标准语音合成',
              '基础角色库'
            ]
          },
          pro: {
            name: 'Pro套餐',
            price: '49.9',
            period: '月',
            features: [
              '无限对话次数',
              'GPT-4模型',
              '高级语音合成',
              '完整角色库',
              '自定义角色',
              '优先客服支持'
            ]
          },
          team: {
            name: '团队套餐',
            price: '299.9',
            period: '月',
            features: [
              '所有Pro套餐功能',
              '5个子账号',
              'API访问',
              '专属客服',
              '自定义模型训练',
              '品牌定制'
            ]
          }
        },
        popular: '最受欢迎',
        payNow: '立即支付',
        selectPlanBtn: '选择套餐'
      },

      // 搜索
      search: {
        placeholder: '搜索名字、关键词或标签'
      },

      // 过滤器
      filters: {
        featured: '精选',
        popular: '热门',
        new: '最新',
        group: '群组'
      },

      // 标签
      tags: {
        showMore: '显示更多 ∨',
        showLess: '收起 ∧',
        historical: '历史',
        fantasy: '奇幻',
        adventure: '冒险',
        romance: '恋爱',
        mystery: '悬疑',
        sciFi: '科幻',
        drama: '剧情',
        comedy: '喜剧',
        action: '动作',
        sliceOfLife: '日常',
        schoolLife: '校园',
        modern: '现代',
        urban: '都市',
        rural: '乡村',
        office: '职场',
        virtual: '虚拟',
        fashion: '时尚',
        music: '音乐',
        influencer: '网红',
        martialArts: '武侠',
        cultivation: '修仙',
        supernatural: '超自然',
        magic: '魔法',
        timeTravel: '穿越',
        gaming: '游戏',
        sports: '体育',
        art: '艺术',
        food: '美食',
        travel: '旅行',
        business: '商业',
        politics: '政治',
        military: '军事',
        medical: '医疗',
        detective: '侦探',
        cyberpunk: '赛博朋克',
        postApocalyptic: '末世',
        steampunk: '蒸汽朋克',
        mythology: '神话',
        folklore: '民俗',
        superpower: '超能力',
        ai: '人工智能',
        robot: '机器人',
        space: '太空',
        kingdom: '王国',
        empire: '帝国',
        academy: '学院',
        university: '大学',
        family: '家庭',
        friendship: '友情',
        socialMedia: '社交媒体',
        popCulture: '流行文化',
        trendsetter: '潮流引领者'
      },

      // 角色
      characters: {
        liuYexi: {
          name: '柳叶溪',
          description: '一个融合现代美学与中国古典文化的虚拟偶像。'
        },
        kingship: {
          name: 'KINGSHIP',
          description: '来自无聊猿游艇俱乐部NFT项目的开创性虚拟乐队。'
        },
        aespa: {
          name: 'Aespa',
          description: '将真实成员与虚拟角色相结合的韩国女子组合。'
        }
      },

      // 通用
      common: {
        by: '作者'
      },

      // 聊天
      chat: {
        remainingFreeChats: '剩余 {{count}} 次免费对话',
        resetCounter: '重置计数器（仅供测试）'
      }
    }
  },
  ja: {
    translation: {
      // 通用
      edit: '編集',
      save: '保存',
      cancel: 'キャンセル',
      delete: '削除',
      confirm: '確認',
      back: '戻る',
      
      // 导航
      nav: {
        aiAvatar: 'AIアバター',
        chat: 'チャット',
        recharge: 'チャージ',
        profile: 'プロフィール'
      },

      // 个人资料页
      profile: {
        title: 'プロフィール',
        basicInfo: '基本情報',
        userId: 'ユーザーID',
        username: 'ユーザー名',
        editProfile: 'プロフィール編集',
        settings: {
          notification: '通知設定',
          language: '言語設定',
          privacy: 'プライバシー設定',
          help: 'ヘルプとフィードバック',
          logout: 'ログアウト'
        },
        memberStatus: {
          premium: 'プレミアム会員',
          regular: '一般会員'
        }
      },

      // 充值页面
      recharge: {
        title: 'チャージ',
        currentStatus: '現在のステータス',
        selectPlan: 'プラン選択',
        plans: {
          basic: {
            name: 'ベーシックプラン',
            price: '19.9',
            period: '月',
            features: [
              '1日100回のチャット',
              '基本AIモデル',
              '標準音声合成',
              '基本キャラクターライブラリ'
            ]
          },
          pro: {
            name: 'プロプラン',
            price: '49.9',
            period: '月',
            features: [
              '無制限チャット',
              'GPT-4モデル',
              '高度な音声合成',
              '完全なキャラクターライブラリ',
              'カスタムキャラクター',
              '優先サポート'
            ]
          },
          team: {
            name: 'チームプラン',
            price: '299.9',
            period: '月',
            features: [
              'すべてのPro機能',
              '5つのサブアカウント',
              'APIアクセス',
              '専属サポート',
              'カスタムモデルトレーニング',
              'ブランドカスタマイズ'
            ]
          }
        },
        popular: '人気',
        payNow: '今すぐ支払う',
        selectPlanBtn: 'プラン選択'
      }
    }
  },
  fr: {
    translation: {
      // 通用
      edit: 'Modifier',
      save: 'Enregistrer',
      cancel: 'Annuler',
      delete: 'Supprimer',
      confirm: 'Confirmer',
      back: 'Retour',
      
      // 导航
      nav: {
        aiAvatar: 'Avatar IA',
        chat: 'Discussion',
        recharge: 'Recharger',
        profile: 'Profil'
      },

      profile: {
        title: 'Profil',
        basicInfo: 'Informations de base',
        userId: 'ID Utilisateur',
        username: "Nom d'utilisateur",
        editProfile: 'Modifier le profil',
        settings: {
          notification: 'Paramètres de notification',
          language: 'Paramètres de langue',
          privacy: 'Paramètres de confidentialité',
          help: 'Aide et commentaires',
          logout: 'Déconnexion'
        },
        memberStatus: {
          premium: 'Membre Premium',
          regular: 'Membre Standard'
        }
      },

      recharge: {
        title: 'Recharger',
        currentStatus: 'Statut actuel',
        selectPlan: 'Sélectionner un forfait',
        plans: {
          basic: {
            name: 'Forfait Basic',
            price: '19.9',
            period: 'mois',
            features: [
              '100 discussions par jour',
              'Modèle IA basique',
              'Synthèse vocale standard',
              'Bibliothèque de personnages basique'
            ]
          },
          pro: {
            name: 'Forfait Pro',
            price: '49.9',
            period: 'mois',
            features: [
              'Discussions illimitées',
              'Modèle GPT-4',
              'Synthèse vocale avancée',
              'Bibliothèque complète de personnages',
              'Personnages personnalisés',
              'Support prioritaire'
            ]
          },
          team: {
            name: 'Forfait Équipe',
            price: '299.9',
            period: 'mois',
            features: [
              'Toutes les fonctionnalités Pro',
              '5 sous-comptes',
              'Accès API',
              'Support dédié',
              'Entraînement de modèle personnalisé',
              'Personnalisation de marque'
            ]
          }
        },
        popular: 'Plus populaire',
        payNow: 'Payer maintenant',
        selectPlanBtn: 'Sélectionner le forfait'
      }
    }
  },
  de: {
    translation: {
      // 通用
      edit: 'Bearbeiten',
      save: 'Speichern',
      cancel: 'Abbrechen',
      delete: 'Löschen',
      confirm: 'Bestätigen',
      back: 'Zurück',
      
      nav: {
        aiAvatar: 'KI-Avatar',
        chat: 'Chat',
        recharge: 'Aufladen',
        profile: 'Profil'
      },

      profile: {
        title: 'Profil',
        basicInfo: 'Grundinformationen',
        userId: 'Benutzer-ID',
        username: 'Benutzername',
        editProfile: 'Profil bearbeiten',
        settings: {
          notification: 'Benachrichtigungseinstellungen',
          language: 'Spracheinstellungen',
          privacy: 'Datenschutzeinstellungen',
          help: 'Hilfe & Feedback',
          logout: 'Abmelden'
        },
        memberStatus: {
          premium: 'Premium-Mitglied',
          regular: 'Reguläres Mitglied'
        }
      },

      recharge: {
        title: 'Aufladen',
        currentStatus: 'Aktueller Status',
        selectPlan: 'Plan auswählen',
        plans: {
          basic: {
            name: 'Basis-Plan',
            price: '19.9',
            period: 'Monat',
            features: [
              '100 Chats pro Tag',
              'Basis KI-Modell',
              'Standard Sprachsynthese',
              'Basis Charakterbibliothek'
            ]
          },
          pro: {
            name: 'Pro-Plan',
            price: '49.9',
            period: 'Monat',
            features: [
              'Unbegrenzte Chats',
              'GPT-4 Modell',
              'Erweiterte Sprachsynthese',
              'Vollständige Charakterbibliothek',
              'Benutzerdefinierte Charaktere',
              'Prioritäts-Support'
            ]
          },
          team: {
            name: 'Team-Plan',
            price: '299.9',
            period: 'Monat',
            features: [
              'Alle Pro-Funktionen',
              '5 Unterkonten',
              'API-Zugang',
              'Dedizierter Support',
              'Benutzerdefiniertes Modelltraining',
              'Markenanpassung'
            ]
          }
        },
        popular: 'Am beliebtesten',
        payNow: 'Jetzt bezahlen',
        selectPlanBtn: 'Plan auswählen'
      }
    }
  },
  ru: {
    translation: {
      // 通用
      edit: 'Редактировать',
      save: 'Сохранить',
      cancel: 'Отмена',
      delete: 'Удалить',
      confirm: 'Подтвердить',
      back: 'Назад',
      
      nav: {
        aiAvatar: 'ИИ Аватар',
        chat: 'Чат',
        recharge: 'Пополнить',
        profile: 'Профиль'
      },

      profile: {
        title: 'Профиль',
        basicInfo: 'Основная информация',
        userId: 'ID пользователя',
        username: 'Имя пользователя',
        editProfile: 'Редактировать профиль',
        settings: {
          notification: 'Настройки уведомлений',
          language: 'Настройки языка',
          privacy: 'Настройки конфиденциальности',
          help: 'Помощь и обратная связь',
          logout: 'Выйти'
        },
        memberStatus: {
          premium: 'Премиум участник',
          regular: 'Обычный участник'
        }
      },

      recharge: {
        title: 'Пополнить',
        currentStatus: 'Текущий статус',
        selectPlan: 'Выбрать план',
        plans: {
          basic: {
            name: 'Базовый план',
            price: '19.9',
            period: 'месяц',
            features: [
              '100 чатов в день',
              'Базовая модель ИИ',
              'Стандартный синтез речи',
              'Базовая библиотека персонажей'
            ]
          },
          pro: {
            name: 'Про план',
            price: '49.9',
            period: 'месяц',
            features: [
              'Безлимитные чаты',
              'Модель GPT-4',
              'Продвинутый синтез речи',
              'Полная библиотека персонажей',
              'Пользовательские персонажи',
              'Приоритетная поддержка'
            ]
          },
          team: {
            name: 'Командный план',
            price: '299.9',
            period: 'месяц',
            features: [
              'Все функции Pro',
              '5 дополнительных аккаунтов',
              'Доступ к API',
              'Выделенная поддержка',
              'Настраиваемое обучение модели',
              'Брендирование'
            ]
          }
        },
        popular: 'Самый популярный',
        payNow: 'Оплатить сейчас',
        selectPlanBtn: 'Выбрать план'
      }
    }
  },
  ar: {
    translation: {
      // 通用
      edit: 'تعديل',
      save: 'حفظ',
      cancel: 'إلغاء',
      delete: 'حذف',
      confirm: 'تأكيد',
      back: 'رجوع',
      
      nav: {
        aiAvatar: 'الصورة الرمزية للذكاء الاصطناعي',
        chat: 'محادثة',
        recharge: 'إعادة الشحن',
        profile: 'الملف الشخصي'
      },

      profile: {
        title: 'الملف الشخصي',
        basicInfo: 'المعلومات الأساسية',
        userId: 'معرف المستخدم',
        username: 'اسم المستخدم',
        editProfile: 'تعديل الملف الشخصي',
        settings: {
          notification: 'إعدادات الإشعارات',
          language: 'إعدادات اللغة',
          privacy: 'إعدادات الخصوصية',
          help: 'المساعدة والتعليقات',
          logout: 'تسجيل الخروج'
        },
        memberStatus: {
          premium: 'عضو مميز',
          regular: 'عضو عادي'
        }
      },

      recharge: {
        title: 'إعادة الشحن',
        currentStatus: 'الحالة الحالية',
        selectPlan: 'اختر الخطة',
        plans: {
          basic: {
            name: 'الخطة الأساسية',
            price: '19.9',
            period: 'شهر',
            features: [
              '100 محادثة يومياً',
              'نموذج ذكاء اصطناعي أساسي',
              'تركيب صوت قياسي',
              'مكتبة شخصيات أساسية'
            ]
          },
          pro: {
            name: 'الخطة الاحترافية',
            price: '49.9',
            period: 'شهر',
            features: [
              'محادثات غير محدودة',
              'نموذج GPT-4',
              'تركيب صوت متقدم',
              'مكتبة شخصيات كاملة',
              'شخصيات مخصصة',
              'دعم ذو أولوية'
            ]
          },
          team: {
            name: 'خطة الفريق',
            price: '299.9',
            period: 'شهر',
            features: [
              'جميع ميزات النسخة الاحترافية',
              '5 حسابات فرعية',
              'الوصول إلى API',
              'دعم مخصص',
              'تدريب نموذج مخصص',
              'تخصيص العلامة التجارية'
            ]
          }
        },
        popular: 'الأكثر شعبية',
        payNow: 'ادفع الآن',
        selectPlanBtn: 'اختر الخطة'
      }
    }
  },
  pt: {
    translation: {
      // 通用
      edit: 'Editar',
      save: 'Salvar',
      cancel: 'Cancelar',
      delete: 'Excluir',
      confirm: 'Confirmar',
      back: 'Voltar',
      
      nav: {
        aiAvatar: 'Avatar IA',
        chat: 'Chat',
        recharge: 'Recarregar',
        profile: 'Perfil'
      },

      profile: {
        title: 'Perfil',
        basicInfo: 'Informações Básicas',
        userId: 'ID do Usuário',
        username: 'Nome de Usuário',
        editProfile: 'Editar Perfil',
        settings: {
          notification: 'Configurações de Notificação',
          language: 'Configurações de Idioma',
          privacy: 'Configurações de Privacidade',
          help: 'Ajuda e Feedback',
          logout: 'Sair'
        },
        memberStatus: {
          premium: 'Membro Premium',
          regular: 'Membro Regular'
        }
      },

      recharge: {
        title: 'Recarregar',
        currentStatus: 'Status Atual',
        selectPlan: 'Selecionar Plano',
        plans: {
          basic: {
            name: 'Plano Básico',
            price: '19.9',
            period: 'mês',
            features: [
              '100 chats por dia',
              'Modelo IA básico',
              'Síntese de voz padrão',
              'Biblioteca básica de personagens'
            ]
          },
          pro: {
            name: 'Plano Pro',
            price: '49.9',
            period: 'mês',
            features: [
              'Chats ilimitados',
              'Modelo GPT-4',
              'Síntese de voz avançada',
              'Biblioteca completa de personagens',
              'Personagens personalizados',
              'Suporte prioritário'
            ]
          },
          team: {
            name: 'Plano Equipe',
            price: '299.9',
            period: 'mês',
            features: [
              'Todas as funcionalidades Pro',
              '5 sub-contas',
              'Acesso API',
              'Suporte dedicado',
              'Treinamento de modelo personalizado',
              'Personalização de marca'
            ]
          }
        },
        popular: 'Mais Popular',
        payNow: 'Pagar Agora',
        selectPlanBtn: 'Selecionar Plano'
      }
    }
  },
  it: {
    translation: {
      // 通用
      edit: 'Modifica',
      save: 'Salva',
      cancel: 'Annulla',
      delete: 'Elimina',
      confirm: 'Conferma',
      back: 'Indietro',
      
      nav: {
        aiAvatar: 'Avatar IA',
        chat: 'Chat',
        recharge: 'Ricarica',
        profile: 'Profilo'
      },

      profile: {
        title: 'Profilo',
        basicInfo: 'Informazioni di Base',
        userId: 'ID Utente',
        username: 'Nome Utente',
        editProfile: 'Modifica Profilo',
        settings: {
          notification: 'Impostazioni Notifiche',
          language: 'Impostazioni Lingua',
          privacy: 'Impostazioni Privacy',
          help: 'Aiuto e Feedback',
          logout: 'Esci'
        },
        memberStatus: {
          premium: 'Membro Premium',
          regular: 'Membro Standard'
        }
      },

      recharge: {
        title: 'Ricarica',
        currentStatus: 'Stato Attuale',
        selectPlan: 'Seleziona Piano',
        plans: {
          basic: {
            name: 'Piano Base',
            price: '19.9',
            period: 'mese',
            features: [
              '100 chat al giorno',
              'Modello IA base',
              'Sintesi vocale standard',
              'Libreria personaggi base'
            ]
          },
          pro: {
            name: 'Piano Pro',
            price: '49.9',
            period: 'mese',
            features: [
              'Chat illimitati',
              'Modello GPT-4',
              'Sintesi vocale avanzata',
              'Libreria personaggi completa',
              'Personaggi personalizzati',
              'Supporto prioritario'
            ]
          },
          team: {
            name: 'Piano Team',
            price: '299.9',
            period: 'mese',
            features: [
              'Tutte le funzionalità Pro',
              '5 sub-account',
              'Accesso API',
              'Supporto dedicato',
              'Training modello personalizzato',
              'Personalizzazione brand'
            ]
          }
        },
        popular: 'Più Popolare',
        payNow: 'Paga Ora',
        selectPlanBtn: 'Seleziona Piano'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'zh', 'ja', 'ko', 'fr', 'de', 'es', 'it', 'ru', 'pt', 'ar', 'hi', 'th', 'vi'],
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;