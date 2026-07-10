import { Source } from "./types";

export const INITIAL_SOURCES: Source[] = [
  {
    id: "attention",
    title: "Attention is all you need",
    format: "PDF",
    size: "1.2 MB",
    date: "Jun 2017",
    category: "Architecture",
    content: `We propose the Transformer, a model architecture eschewing recurrence and instead relying entirely on an attention mechanism to draw global dependencies between input and output. The Transformer allows for significantly more parallelization and can reach a new state of the art in translation quality after being trained for only twelve hours on eight P100 GPUs.

The majority of competitive neural sequence transduction models have an encoder-decoder structure. Here, the encoder maps an input sequence of symbol representations (x_1, ..., x_n) to a sequence of continuous representations z = (z_1, ..., z_n). Given z, the decoder then generates an output sequence (y_1, ..., y_m) of symbols one element at a time. At each step the model is auto-regressive, consuming the previously generated symbols as additional input when generating the next.

Self-attention, sometimes called intra-attention is an attention mechanism relating different positions of a single sequence in order to compute a representation of the sequence. It has been used successfully in a variety of tasks including reading comprehension, abstractive summarization, textual entailment and learning task-independent sentence representations.

Multi-head attention allows the model to jointly attend to information from different representation subspaces at different positions. With a single attention head, averaging inhibits this.`
  },
  {
    id: "bert",
    title: "BERT: Pre-training",
    format: "PDF",
    size: "850 KB",
    date: "Oct 2018",
    category: "Models",
    content: `We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers. Unlike recent language representation models, BERT is designed to pre-train deep bidirectional representations from unlabeled text by jointly conditioning on both left and right context in all layers. As a result, the pre-trained BERT model can be fine-tuned with just one additional output layer to create state-of-the-art models for a wide range of tasks, such as question answering and language inference, without substantial task-specific architecture modifications.

Language model pre-training has been shown to be effective for improving many natural language processing tasks. These include sentence-level tasks such as natural language inference and paraphrasing, by predicting the relations between sentences, and token-level tasks such as named entity recognition and question answering, where models are required to produce fine-grained output at the token level.

There are two existing strategies for applying pre-trained representations to downstream tasks: feature-based and fine-tuning. The feature-based approach, such as ELMo, uses task-specific architectures that include pre-trained representations as additional features. The fine-tuning approach, such as the Generative Pre-trained Transformer (OpenAI GPT), introduces minimal task-specific parameters, and is trained on the downstream tasks by simply fine-tuning all pre-trained parameters.`
  },
  {
    id: "gpt3",
    title: "GPT-3 Architecture",
    format: "DOC",
    size: "2.4 MB",
    date: "May 2020",
    category: "Models",
    content: `We present Language Models are Few-Shot Learners. We train GPT-3, an autoregressive language model with 175 billion parameters, 10x more than any previous non-sparse language model, and test its few-shot performance. For all tasks, GPT-3 is applied without any gradient updates or fine-tuning, with tasks and few-shot demonstrations specified purely via text interaction with the model. GPT-3 achieves strong performance on many NLP datasets, including translation, question-answering, and cloze tasks.

Recent years have seen a trend towards pre-training language representations, which are then fine-tuned on specific downstream tasks. While these approaches have revolutionized NLP, they require task-specific datasets of thousands or tens of thousands of examples. Moreover, fine-tuned models can perform poorly out-of-distribution.

Here we show that scaling up language models greatly improves task-agnostic, few-shot performance, sometimes even reaching competitiveness with prior state-of-the-art fine-tuning approaches. We train a 175 billion parameter autoregressive language model, GPT-3, and measure its learning capacity. Under zero-shot, one-shot, and few-shot learning setups, GPT-3 shows rapid convergence and high task performance.`
  }
];
